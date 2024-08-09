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
import { requiredfile, requiredStr } from "@/configs/schemas";
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { useUploadImage } from "@/hooks/useUploadImage";

const categoryCreateFormSchema = z.object({
  name: requiredStr,
  category_cover: requiredfile,
});

type FormValues = z.infer<typeof categoryCreateFormSchema>;

const CategoryCreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: uploadImage } = useUploadImage();
  const { mutateAsync, error } = useCreateCategory();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(categoryCreateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      setIsLoading(true);
      const {
        data: { data: url },
      } = await uploadImage(formValues.category_cover);
      await mutateAsync({ ...formValues, category_cover: url });
      toast.success("Berhasil menambah data kategori");
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
              <FormLabel className="required">Sampul</FormLabel>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Nama</FormLabel>
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

export default CategoryCreateForm;
