"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  optionalFile,
  requiredInt,
  requiredISODate,
  requiredNum,
  requiredStr,
} from "@/configs/schemas";
import { useGetAuthors } from "@/hooks/useGetAuthors";
import { useGetBookById } from "@/hooks/useGetBookById";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPublishers } from "@/hooks/useGetPublishers";
import { useUpdateBookById } from "@/hooks/useUpdateBookById";
import { useUploadImage } from "@/hooks/useUploadImage";
import { cn } from "@/lib/utils";

const bookUpdateFormSchema = z.object({
  title: requiredStr,
  description: requiredStr,
  cover: optionalFile,
  total_pages: requiredInt,
  weight: requiredNum,
  width: requiredNum,
  height: requiredNum,
  language: requiredStr,
  published_date: requiredISODate,
  price: requiredInt,
  author_id: requiredInt,
  publisher_id: requiredInt,
  category_ids: z.array(requiredInt).min(1, { message: "Minimal 1 kategori" }),
});

type FormValues = z.infer<typeof bookUpdateFormSchema>;

const BookUpdateForm = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: bookDetail } = useGetBookById(id);
  const { data: authors } = useGetAuthors();
  const { data: publishers } = useGetPublishers();
  const { data: categories } = useGetCategories();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync: updateBook, error } = useUpdateBookById();

  const author_id =
    (
      bookDetail &&
      authors &&
      authors.data.data.find(
        (author) => author.name === bookDetail.data.data.author_name,
      )
    )?.ID ?? ("" as any);

  const publisher_id =
    (
      bookDetail &&
      publishers &&
      publishers.data.data.find(
        (publisher) => publisher.name === bookDetail.data.data.publisher_name,
      )
    )?.ID ?? ("" as any);

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(bookUpdateFormSchema),
    values: {
      title: bookDetail?.data.data.title ?? "",
      description: bookDetail?.data.data.description ?? "",
      total_pages: bookDetail?.data.data.total_pages ?? ("" as any),
      weight: bookDetail?.data.data.weight ?? ("" as any),
      width: bookDetail?.data.data.width ?? ("" as any),
      height: bookDetail?.data.data.height ?? ("" as any),
      language: bookDetail?.data.data.language ?? "",
      published_date: bookDetail?.data.data.published_date ?? "",
      price: bookDetail?.data.data.price ?? ("" as any),
      author_id,
      publisher_id,
      category_ids:
        bookDetail?.data.data.category?.map((category) => category.ID) ?? [],
      cover: null,
    },
  });

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      let url = bookDetail?.data.data.cover_url;
      setIsLoading(true);
      if (formValues.cover) {
        const response = await uploadImage(formValues.cover);
        url = response.data.data;
      }
      url && (await updateBook({ ...formValues, id, cover_url: url }));
      toast.success("Berhasil mengubah data buku");
      router.push("/admin/books");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="cover"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Sampul</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png,image/jpeg"
                  disabled={isLoading}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0] ?? undefined)}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Judul</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isLoading} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Deskripsi</FormLabel>
              <FormControl>
                <Textarea readOnly={isLoading} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_pages"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Total Halaman</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isLoading}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\D/gim, ""));
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Berat (Kilogram)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isLoading}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^\d.]/gim, ""));
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Lebar (Sentimeter)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isLoading}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^\d.]/gim, ""));
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Tinggi (Sentimeter)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isLoading}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/[^\d.]/gim, ""));
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Bahasa</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isLoading} {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published_date"
          render={({ field }) => {
            const fieldValue = field.value && format(field.value, "yyyy-MM-dd");
            return (
              <FormItem>
                <FormLabel className="required">Tanggal Terbit</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    max={format(new Date(), "yyyy-MM-dd")}
                    readOnly={isLoading}
                    {...field}
                    required
                    value={fieldValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value && new Date(value).toISOString());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Harga (Rp)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isLoading}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\D/gim, ""));
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Pengarang</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isLoading}
                      ref={field.ref}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? authors?.data.data.find(
                            (author) => author.ID === field.value,
                          )?.name
                        : "Pilih data pengarang"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Cari data pengarang..." />
                    <CommandList>
                      <CommandEmpty>
                        Data pengarang tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {authors?.data.data.map((author) => (
                          <CommandItem
                            value={author.ID.toString()}
                            key={author.ID}
                            onSelect={() => field.onChange(author.ID)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                author.ID === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {author.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publisher_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Penerbit</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isLoading}
                      ref={field.ref}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? publishers?.data.data.find(
                            (publisher) => publisher.ID === field.value,
                          )?.name
                        : "Pilih data penerbit"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Cari data penerbit..." />
                    <CommandList>
                      <CommandEmpty>
                        Data penerbit tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {publishers?.data.data.map((publisher) => (
                          <CommandItem
                            value={publisher.ID.toString()}
                            key={publisher.ID}
                            onSelect={() => field.onChange(publisher.ID)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                publisher.ID === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {publisher.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_ids"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Kategori</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isLoading}
                      ref={field.ref}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value.length && "text-muted-foreground",
                      )}
                    >
                      {field.value.length
                        ? field.value
                            .map(
                              (value) =>
                                categories?.data.data.find(
                                  (category) => category.ID === value,
                                )?.name,
                            )
                            .join(", ")
                        : "Pilih data kategori"}
                      <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Cari data kategori..." />
                    <CommandList>
                      <CommandEmpty>
                        Data kategori tidak ditemukan.
                      </CommandEmpty>
                      <CommandGroup>
                        {categories?.data.data.map((category) => (
                          <CommandItem
                            value={category.ID.toString()}
                            key={category.ID}
                            onSelect={() => {
                              if (field.value.includes(category.ID)) {
                                field.onChange(
                                  field.value.filter(
                                    (value) => value !== category.ID,
                                  ),
                                );
                              } else {
                                field.onChange([...field.value, category.ID]);
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value.includes(category.ID)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error.message}</FormMessage>}
        <div className="flex justify-end">
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookUpdateForm;
