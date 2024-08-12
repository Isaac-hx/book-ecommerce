"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ActionDialog } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useDeleteCart } from "@/hooks/useDeleteCart";
import { useGetAllCart } from "@/hooks/useGetAllCart";
import { useUpdateCart } from "@/hooks/useUpdateCart";
import { formatKilogram, formatRupiah } from "@/lib/utils";

import { NotFound } from "./NotFound";

const UpdateCartFormSchema = z.object({
  quantity: z.coerce.number().min(1),
});

type FormValues = z.infer<typeof UpdateCartFormSchema>;

export default function CartPage() {
  const { data: allCart, isLoading, isError } = useGetAllCart();
  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateCartFormSchema),
  });

  const { mutateAsync: updateCart } = useUpdateCart();
  const { mutateAsync: deleteCart } = useDeleteCart();

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <NotFound />;

  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-4 p-8">
      <h1 className="text-3xl font-bold">Tas Belanja</h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex h-full w-full flex-col gap-4 rounded md:w-2/3 md:gap-8">
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
                  <Link
                    href={`/books/${book.book_id}`}
                    className="-black flex w-full items-center gap-4 md:w-[73%]"
                  >
                    <Image
                      src={book.Book.cover_url}
                      alt={book.Book.title}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-contain"
                    />
                    <div className="-blue-400 flex flex-col gap-2">
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
                  </Link>
                  <div className="w-full md:w-[28%]">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-full border bg-primary font-bold text-background disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => {
                            if (book.quantity > 1) {
                              updateCart({
                                quantity: book.quantity - 1,
                                book_id: Number(book.book_id),
                              }).catch(() => {
                                toast.error("Gagal mengurangi kuantitas buku");
                              });
                            }
                          }}
                          type="button"
                        >
                          <Minus />
                        </button>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          className="hide-arrow w-10 appearance-none border-none bg-background p-0 text-center outline-none"
                          value={book.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value > 0) {
                              form.setValue("quantity", value);
                              updateCart({
                                quantity: value,
                                book_id: Number(book.book_id),
                              }).catch(() => {
                                toast.error("Gagal mengupdate kuantitas buku");
                              });
                            }
                          }}
                        />
                        <button
                          className="rounded-full border bg-primary font-bold text-background disabled:cursor-not-allowed disabled:opacity-50"
                          onClick={() => {
                            updateCart({
                              quantity: book.quantity + 1,
                              book_id: Number(book.book_id),
                            }).catch(() => {
                              toast.error("Gagal menambahkan kuantitas buku");
                            });
                          }}
                          type="button"
                        >
                          <Plus />
                        </button>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <ActionDialog
                          title="Hapus item dari keranjang"
                          description="Apakah anda yakin ingin menghapus item ini dari keranjang?"
                          trigger={
                            <Button
                              className="flex items-center text-sm hover:bg-destructive hover:text-background"
                              variant={"outline"}
                              size={"sm"}
                            >
                              <Trash className="mr-2" size={16} /> Hapus
                            </Button>
                          }
                          actionName="Hapus"
                          actionHandler={() => {
                            deleteCart(book.book_id).then(() => {
                              toast.success(
                                "Berhasil menghapus item dari keranjang",
                              );
                            });
                          }}
                        />
                      </div>
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
        <div className="flex h-fit w-full flex-col rounded-lg border md:w-1/3">
          <p className="p-4 text-lg font-bold md:p-8 md:text-2xl">
            Rincian Belanja
          </p>
          <hr />
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between text-sm font-semibold">
              <p>Ringkasan Pembayaran</p>
              <p className="text-base font-bold text-primary">
                {formatRupiah(
                  allCart?.data.data
                    .map((book) => book.quantity * book.Book.price)
                    .reduce((prev, curr) => prev + curr, 0)!,
                )}
              </p>
            </div>
            <Button className="rounded-full py-3 font-bold md:py-6" asChild>
              <Link href="/checkout">Lanjut ke Pembayaran</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
