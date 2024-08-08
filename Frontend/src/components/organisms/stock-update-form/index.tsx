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
import { requiredInt } from "@/configs/schemas";
import { useUpdateStockById } from "@/hooks/useUpdateStockById";

const stockUpdateFormSchema = z.object({
  quantity: requiredInt,
});

type FormValues = z.infer<typeof stockUpdateFormSchema>;

const StockUpdateForm = ({ id }: { id: string }) => {
  const { mutateAsync, isPending, error } = useUpdateStockById();

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(stockUpdateFormSchema),
    defaultValues: {
      quantity: "" as any,
    },
  });

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync({ ...formValues, id }).then(() => {
      toast.success("Berhasil mengubah data stok");
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

export default StockUpdateForm;
