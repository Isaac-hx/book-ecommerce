"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { book } from "@/lib/dummyData";
import {
  formatCentimeter,
  formatDate,
  formatKilogram,
  formatRupiah,
} from "@/lib/utils";

export default function DetailBookPage() {
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  // TODO: implement API cart

  return (
    <div className="container flex min-h-screen flex-col px-4 py-10">
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <div className="flex items-center justify-center md:w-fit md:items-start">
          <Image
            src={book.cover_url}
            alt={book.title}
            width={165}
            height={200}
            className="w-full rounded border object-contain p-4"
          />
        </div>
        <div className="flex flex-col gap-4 md:w-2/4">
          <div className="mb-4 flex flex-col gap-1">
            <p className="text-muted-foreground">{book.author}</p>
            <p className="text-xl font-bold">{book.title}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold">Deskripsi Buku</p>
            <p
              className={`text-justify text-sm tracking-wide ${showDescription ? "line-clamp-none" : "line-clamp-5"}`}
            >
              {book.description}
            </p>
            <button
              className="w-fit text-sm text-primary"
              onClick={toggleDescription}
            >
              {showDescription ? "Ringkas Deskripsi" : "Baca Selengkapnya"}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Detail</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Jumlah Halaman
                </p>
                <p className="text-sm">{book.total_pages}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Penerbit
                </p>
                <p className="text-sm">{book.publisher}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Tanggal Terbit
                </p>
                <p className="text-sm">{formatDate(book.published_date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Berat
                </p>
                <p className="text-sm">{formatKilogram(book.weight)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Lebar
                </p>
                <p className="text-sm">{formatCentimeter(book.width)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Panjang
                </p>
                <p className="text-sm">{formatCentimeter(book.height)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bahasa
                </p>
                <p className="text-sm">{book.language}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-fit flex-col gap-2 md:w-1/5">
          <p className="font-semibold text-muted-foreground">
            Ingin beli berapa?
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">Jumlah Barang</p>
            <div className="flex gap-x-2">
              <button
                className="rounded-full border bg-primary font-bold"
                onClick={decrementQuantity}
              >
                <Minus />
              </button>
              <input
                type="number"
                min={1}
                step={1}
                value={quantity}
                className="hide-arrow w-8 appearance-none bg-background text-center outline-none"
                onChange={(e) => setQuantity(Number(e.target.value))}
                onWheel={(e) => e.currentTarget.blur()}
              />
              <button
                className="rounded-full border bg-primary font-bold"
                onClick={incrementQuantity}
              >
                <Plus />
              </button>
            </div>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="font-bold text-muted-foreground">Subtotal</p>
            <p className="font-bold text-primary">
              {formatRupiah(book.price * quantity)}
            </p>
          </div>
          <Button>
            Keranjang <ShoppingCart className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}