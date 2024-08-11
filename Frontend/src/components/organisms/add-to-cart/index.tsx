"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddToCart } from "@/hooks/useAddToCart";
import { formatRupiah } from "@/lib/utils";
import { GetBookByIdResponse } from "@/services/book/types";

const AddToCartFormSchema = z.object({
  book_id: z.coerce.number(),
  quantity: z.coerce.number().min(1),
});

type FormValues = z.infer<typeof AddToCartFormSchema>;

export const AddToCart = ({
  data,
  id,
}: {
  data: GetBookByIdResponse["data"];
  id: string;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(AddToCartFormSchema),
    defaultValues: {
      book_id: Number(id),
      quantity: 1,
    },
  });

  const router = useRouter();

  const handleDecrement = () => {
    const currentQuantity = form.getValues("quantity");
    if (currentQuantity > 1) {
      form.setValue("quantity", currentQuantity - 1);
    }
  };

  const handleIncrement = () => {
    const currentQuantity = form.getValues("quantity");
    form.setValue("quantity", currentQuantity + 1);
  };

  const subTotal = Math.abs(data?.price * form.watch("quantity"));

  const { mutateAsync, isPending } = useAddToCart();

  const handleFormSubmit = (formValues: FormValues) => {
    mutateAsync(formValues)
      .then(() => {
        toast.success("Berhasil menambahkan ke keranjang");
        router.push("/cart");
      })
      .catch(() => {
        toast.error("Gagal menambahkan ke keranjang", {
          description: "Buku sudah ada di keranjang",
        });
      });
  };

  return (
    <div className="flex w-full flex-col md:w-1/5">
      <Form {...form}>
        <form
          className="flex h-fit flex-col gap-4"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <p className="font-semibold text-muted-foreground">
            Ingin beli berapa?
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">Jumlah Barang</p>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-full border bg-primary font-bold disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleDecrement}
                        type="button"
                        disabled={field.value <= 1 || isPending}
                      >
                        <Minus />
                      </button>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        className="hide-arrow w-10 appearance-none border-none bg-background p-0 text-center outline-none"
                        value={field.value}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value)) {
                            form.setValue("quantity", value);
                          }
                        }}
                        disabled={isPending}
                      />
                      <button
                        className="rounded-full border bg-primary font-bold disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={handleIncrement}
                        type="button"
                        disabled={isPending}
                      >
                        <Plus />
                      </button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="font-bold text-muted-foreground">Subtotal</p>
            <p className="font-bold text-primary">{formatRupiah(subTotal)}</p>
          </div>
          <Button type="submit" disabled={isPending}>
            Keranjang <ShoppingCart className="ml-2" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
