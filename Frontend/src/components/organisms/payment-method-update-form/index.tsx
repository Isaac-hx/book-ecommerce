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
import { useGetPaymentMethodById } from "@/hooks/useGetPaymentMethodById";
import { useUpdatePaymentMethodById } from "@/hooks/useUpdatePaymentMethodById";

const paymentMethodUpdateFormSchema = z.object({
  name: requiredStr,
  account_number: requiredStr,
  account_holder_name: requiredStr,
});

type FormValues = z.infer<typeof paymentMethodUpdateFormSchema>;

const PaymentMethodUpdateForm = ({ id }: { id: string }) => {
  const { data } = useGetPaymentMethodById(id);
  const { mutateAsync, isPending, error } = useUpdatePaymentMethodById();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(paymentMethodUpdateFormSchema),
    values: {
      name: data?.data.data.name ?? "",
      account_number: data?.data.data.account_number ?? "",
      account_holder_name: data?.data.data.account_holder_name ?? "",
    },
  });

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync({ ...formValues, id }).then(() => {
      toast.success("Berhasil mengubah data rekening");
      router.push("/admin/payment-methods");
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
              <FormLabel className="required">Nama</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_holder_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">Pemilik</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required">No. Rekening</FormLabel>
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

export default PaymentMethodUpdateForm;
