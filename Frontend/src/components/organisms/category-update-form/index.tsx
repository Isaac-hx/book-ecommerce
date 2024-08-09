"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { optionalFile, requiredStr } from "@/configs/schemas";
import { useGetCategoryById } from "@/hooks/useGetCategoryById";
import { useUpdateCategoryById } from "@/hooks/useUpdateCategoryById";
import { useUploadImage } from "@/hooks/useUploadImage";

const categoryUpdateFormSchema = z.object({
  name: requiredStr,
  category_cover: optionalFile,
});

type FormValues = z.infer<typeof categoryUpdateFormSchema>;

const CategoryUpdateForm = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetCategoryById(id);
  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync, error } = useUpdateCategoryById();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(categoryUpdateFormSchema),
    values: {
      name: data?.data.data.name || "",
      category_cover: null,
    },
  });

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      let url = data?.data.data.category_cover ?? "";
      setIsLoading(true);
      if (formValues.category_cover) {
        const response = await uploadImage(formValues.category_cover);
        url = response.data.data;
      }
      url && (await mutateAsync({ ...formValues, id, category_cover: url }));
      toast.success("Berhasil mengubah data kategori");
      router.push("/admin/categories");
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
          name="category_cover"
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isLoading} {...field} />
              </FormControl>
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

export default CategoryUpdateForm;
