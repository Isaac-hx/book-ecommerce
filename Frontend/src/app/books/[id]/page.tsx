"use client";

import Image from "next/image";
import React, { useState } from "react";

import { ErrorMessage } from "@/components/molecules";
import { AddToCart } from "@/components/organisms/add-to-cart";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useGetBookById } from "@/hooks/useGetBookById";
import { formatCentimeter, formatDate, formatKilogram } from "@/lib/utils";

type DetailBookPageProps = {
  params: {
    id: string;
  };
};

export default function DetailBookPage({
  params: { id },
}: DetailBookPageProps) {
  const [showDescription, setShowDescription] = useState(false);

  const { data: book, isLoading, error } = useGetBookById(id);

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  // TODO: implement API cart

  return (
    <div className="container flex min-h-screen flex-col px-4 py-10">
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <div className="flex items-center justify-center md:w-fit md:items-start">
          <Image
            src={
              book?.data.data.cover_url
                ? book?.data.data.cover_url
                : "https://via.placeholder.com/165x200.png"
            }
            alt={book?.data.data.title ?? "Cover Buku"}
            width={165}
            height={200}
            className="rounded border object-contain p-4"
          />
        </div>
        <div className="flex flex-col gap-4 md:w-2/4">
          <div className="mb-4 flex flex-col gap-1">
            <p className="text-muted-foreground">
              {book?.data.data.author_name}
            </p>
            <p className="text-xl font-bold">{book?.data.data.title}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Deskripsi Buku</p>
            <p
              className={`text-justify text-sm tracking-wide ${showDescription ? "line-clamp-none" : "line-clamp-5"}`}
            >
              {book?.data.data.description ?? "-"}
            </p>
            {book?.data.data.description && (
              <button
                className="w-fit text-sm text-primary"
                onClick={toggleDescription}
              >
                {showDescription ? "Ringkas Deskripsi" : "Baca Selengkapnya"}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Detail</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Jumlah Halaman
                </p>
                <p className="text-sm">{book?.data.data.total_pages ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Penerbit
                </p>
                <p className="text-sm">
                  {book?.data.data.publisher_name ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tanggal Terbit
                </p>
                <p className="text-sm">
                  {book?.data.data.published_date
                    ? formatDate(book?.data.data.published_date)
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Berat
                </p>
                <p className="text-sm">
                  {book?.data.data.weight
                    ? formatKilogram(book?.data.data.weight)
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Lebar
                </p>
                <p className="text-sm">
                  {book?.data.data.width
                    ? formatCentimeter(book?.data.data.width)
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Panjang
                </p>
                <p className="text-sm">
                  {book?.data.data.height
                    ? formatCentimeter(book?.data.data.height)
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bahasa
                </p>
                <p className="text-sm">{book?.data.data.language ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Stok
                </p>
                <p className="text-sm">{book?.data.data.quantity ?? "-"}</p>
              </div>
            </div>
          </div>
        </div>
        <AddToCart data={book?.data.data!} id={id} />
      </div>
    </div>
  );
}
