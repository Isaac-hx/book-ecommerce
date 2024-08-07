"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { requiredStr } from "@/configs/schemas";
import { useGetCategoryById } from "@/hooks/useGetCategoryById";
import { useUpdateCategoryById } from "@/hooks/useUpdateCategoryById";

const categoryUpdateFormSchema = z.object({
  name: requiredStr,
});

type FormValues = z.infer<typeof categoryUpdateFormSchema>;

const CategoryUpdateForm = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data } = useGetCategoryById(id);

  const form = useForm<FormValues>({
    resolver: zodResolver(categoryUpdateFormSchema),
    values: {
      name: data?.data.data.name || "",
    },
  });

  const { mutateAsync, isPending, error } = useUpdateCategoryById();

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync({ id, ...formValues }).then((res) => {
      toast.success(res.data.message);
      router.push("/admin/categories");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isPending} {...field} />
              </FormControl>
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

export default CategoryUpdateForm;
