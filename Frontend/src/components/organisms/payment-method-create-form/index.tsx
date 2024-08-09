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
import { useCreatePaymentMethod } from "@/hooks/useCreatePaymentMethod";

const paymentMethodCreateFormSchema = z.object({
  name: requiredStr,
  account_number: requiredStr,
  account_holder_name: requiredStr,
});

type FormValues = z.infer<typeof paymentMethodCreateFormSchema>;

const PaymentMethodCreateForm = () => {
  const { mutateAsync, isPending, error } = useCreatePaymentMethod();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(paymentMethodCreateFormSchema),
    defaultValues: {
      name: "",
      account_number: "",
      account_holder_name: "",
    },
  });

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync(formValues).then(() => {
      toast.success("Berhasil menambah data rekening");
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

export default PaymentMethodCreateForm;
