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
import { useGetAuthorById } from "@/hooks/useGetAuthorById";
import { useUpdateAuthorById } from "@/hooks/useUpdateAuthorById";

const authorUpdateFormSchema = z.object({
  name: requiredStr,
});

type FormValues = z.infer<typeof authorUpdateFormSchema>;

const AuthorUpdateForm = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data } = useGetAuthorById(id);

  const form = useForm<FormValues>({
    resolver: zodResolver(authorUpdateFormSchema),
    values: {
      name: data?.data.data.name || "",
    },
  });

  const { mutateAsync, isPending, error } = useUpdateAuthorById();

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync({ id, ...formValues }).then((res) => {
      toast.success(res.data.message);
      router.push("/admin/authors");
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

export default AuthorUpdateForm;
