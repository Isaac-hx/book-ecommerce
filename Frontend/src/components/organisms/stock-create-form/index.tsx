"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash/fp/debounce";
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
import { requiredInt } from "@/configs/schemas";
import { useCreateStock } from "@/hooks/useCreateStock";
import { useGetBooks } from "@/hooks/useGetBooks";
import { cn } from "@/lib/utils";
import { GetAllBookParams } from "@/services/book/types";

const stockCreateFormSchema = z.object({
  quantity: requiredInt,
  book_id: requiredInt,
});

type FormValues = z.infer<typeof stockCreateFormSchema>;

const StockCreateForm = () => {
  const [params, setParams] = useState<GetAllBookParams>({
    title: "",
    limit: 100,
  });

  const { data: books } = useGetBooks(params);
  const { mutateAsync, isPending, error } = useCreateStock();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(stockCreateFormSchema),
    defaultValues: {
      quantity: "" as any,
      book_id: "" as any,
    },
  });

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync(formValues).then(() => {
      toast.success("Berhasil menambah data stok");
      router.push("/admin/stocks");
    });
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
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Jumlah</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  readOnly={isPending}
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
          name="book_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="required">Buku</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isPending}
                      ref={field.ref}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? books?.data.data.find(
                            (book) => book.id === field.value,
                          )?.title
                        : "Pilih data buku"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Cari data buku..."
                      onValueChange={debounce(500, (value: string) => {
                        setParams((prev) => ({ ...prev, title: value }));
                      })}
                    />
                    <CommandList>
                      <CommandEmpty>Data buku tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {books?.data.data.map((book) => (
                          <CommandItem
                            value={book.title}
                            key={book.id}
                            onSelect={() => field.onChange(book.id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                book.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {book.title}
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
          <Button type="submit" variant="outline" disabled={isPending}>
            {isPending ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StockCreateForm;
