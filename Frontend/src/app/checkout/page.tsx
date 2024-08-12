"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useGetAllCart } from "@/hooks/useGetAllCart";
import { useGetPaymentMethods } from "@/hooks/useGetPaymentMethods";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { formatKilogram, formatRupiah } from "@/lib/utils";
import { useAuthStore } from "@/store";

const CreateOrderFormSchema = z.object({
  payment_method_id: z.coerce.number().min(1),
  orders: z.array(
    z.object({
      book_id: z.coerce.number().min(1),
      quantity: z.coerce.number().min(1),
    }),
  ),
});

type FormValues = z.infer<typeof CreateOrderFormSchema>;

export default function CheckoutPage() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(CreateOrderFormSchema),
    defaultValues: {
      orders: [{ book_id: 0, quantity: 0 }],
    },
  });

  const {
    data: allCart,
    isLoading: isGetAllCartLoading,
    isError: isGetAllCartError,
  } = useGetAllCart();

  const { _hasHydrated, user } = useAuthStore();
  const { data: profile, isLoading: isGetProfileLoading } = useGetProfileById(
    user?.user_id!,
    !!_hasHydrated,
  );

  const { data: paymentMethods, isLoading: isGetPaymentMethodLoading } =
    useGetPaymentMethods();

  const mapAllCart = useMemo(() => {
    return (
      allCart?.data.data.map((cart) => {
        return {
          book_id: cart.book_id,
          quantity: cart.quantity,
        };
      }) ?? []
    );
  }, [allCart]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      orders: mapAllCart,
    });
  }, [mapAllCart, form]);

  const { mutateAsync } = useCreateOrder();

  const handleCreateOrder = (formValues: FormValues) => {
    mutateAsync(formValues)
      .then(() => {
        toast.success("Berhasil membuat order");
        router.push("/profile/orders");
      })
      .catch((err: AxiosError<any>) => {
        toast.error(err.response?.data.error);
      });
  };

  if (isGetAllCartError) return redirect("/cart");

  if (isGetAllCartLoading || isGetPaymentMethodLoading || isGetProfileLoading)
    return <LoadingSpinner />;

  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-4 p-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex h-full w-full flex-col gap-4 rounded md:w-2/3 md:gap-8">
          {/* Address Section */}
          <div className="flex w-full flex-col justify-center gap-4 rounded-lg border p-4 md:p-8">
            <div className="flex items-center gap-x-2">
              <MapPin /> Alamat Tujuan Pengiriman
            </div>
            {profile?.data.data.address ? (
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {profile?.data.data.first_name} {profile?.data.data.last_name}
                </p>
                <p className="text-sm">{profile?.data.data.phone}</p>
                <p className="text-sm">{profile?.data.data.address}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  Anda belum mempunyai alamat pengiriman
                </p>
                <Link href="/profile" className="text-primary">
                  Tambah Alamat
                </Link>
              </div>
            )}
          </div>
          {/* Cart Section */}
          {allCart?.data.data.map((book, index) => (
            <div
              key={book.id}
              className="flex w-full flex-col justify-center rounded-lg border"
            >
              <div className="flex w-full flex-col gap-4 p-4 md:p-8">
                <p className="font-semibold text-muted-foreground md:font-bold">
                  Pesanan {index + 1}
                </p>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="flex w-full items-center gap-4">
                    <Image
                      src={book.Book.cover_url}
                      alt={book.Book.title}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-contain"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="line-clamp-3 text-sm md:line-clamp-2">
                        {book.Book.title}
                      </p>
                      <p className="text-xs font-light text-muted-foreground">
                        {book.quantity} Barang (
                        {formatKilogram(book.Book.weight * book.quantity)})
                      </p>
                      <p className="font-bold text-primary">
                        {formatRupiah(book.Book.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-primary" />
              <div className="flex justify-between bg-secondary p-4 md:p-6">
                <p className="text-sm font-semibold text-muted-foreground md:text-base">
                  Total Pesanan: {book.quantity}
                </p>
                <p className="text-sm font-bold md:text-base">
                  {formatRupiah(book.Book.price * book.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form
            className="flex h-full w-full flex-col gap-4 rounded md:w-1/3"
            onSubmit={form.handleSubmit(handleCreateOrder)}
          >
            {/* Payment Section */}
            <div className="flex h-fit w-full flex-col gap-4 rounded-lg border p-4">
              <p className="text-lg font-bold text-muted-foreground md:text-xl">
                Metode Pembayaran
              </p>
              <FormField
                control={form.control}
                name="payment_method_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={field.onChange}
                        disabled={paymentMethods?.data.data.length === 0}
                      >
                        <SelectTrigger className="h-16 rounded-full px-8 text-left font-medium">
                          {field.value ? (
                            <SelectValue />
                          ) : (
                            <p className="text-muted-foreground">
                              Pilih Metode Pembayaran
                            </p>
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {paymentMethods?.data.data.map((paymentMethod) => (
                              <SelectItem
                                key={paymentMethod.ID}
                                value={String(paymentMethod.ID)}
                              >
                                <div className="flex w-full flex-col gap-2">
                                  <p className="font-semibold">
                                    {paymentMethod.name} a/n{" "}
                                    {paymentMethod.account_holder_name}
                                  </p>
                                  <p>{paymentMethod.account_number}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex h-fit w-full flex-col rounded-lg border">
              <p className="p-4 text-lg font-bold md:p-8 md:text-xl">
                Rincian Belanja
              </p>
              <hr />
              <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>Total Yang Harus Dibayar</p>
                  <p className="text-base font-bold text-primary">
                    {formatRupiah(
                      allCart?.data.data
                        .map((book) => book.quantity * book.Book.price)
                        .reduce((prev, curr) => prev + curr, 0)!,
                    )}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="rounded-full py-3 font-bold md:py-6"
                  disabled={
                    allCart?.data.data.length === 0 ||
                    !profile?.data.data.address
                  }
                >
                  Bayar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
