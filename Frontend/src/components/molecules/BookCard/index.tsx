import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatRupiah } from "@/lib/utils";

type BookCardProps = {
  id: number;
  title: string;
  author: string;
  price: number;
};

export const BookCard = ({ id, author, title, price }: BookCardProps) => {
  return (
    <Link
      href={`/books/${id}`}
      className="flex h-[350px] w-full max-w-[165px] flex-col gap-4 rounded border px-2 shadow"
    >
      <Image
        src={"https://via.placeholder.com/165"}
        alt="Book"
        width={165}
        height={200}
        className="h-[200px] w-full object-cover"
      />
      <p className="text-sm font-light">{author}</p>
      <div className="flex flex-col">
        <p className="line-clamp-2 font-semibold">{title}</p>
        <p className="font-bold text-primary">{formatRupiah(price)}</p>
      </div>
    </Link>
  );
};
