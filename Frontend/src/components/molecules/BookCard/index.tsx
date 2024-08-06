import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatRupiah } from "@/lib/utils";

type BookCardProps = {
  id: number;
  title: string;
  author: string;
  price: number;
  cover_url: string;
};

export const BookCard = ({
  id,
  author,
  title,
  price,
  cover_url,
}: BookCardProps) => {
  return (
    <Link
      href={`/books/${id}`}
      className="flex max-h-[445px] w-full max-w-[212px] flex-col gap-4 rounded-lg p-2 transition-all hover:shadow hover:shadow-foreground"
    >
      <Image
        src={cover_url}
        alt={title}
        width={212}
        height={330}
        className="h-[330px] w-full object-cover"
      />
      <div className="flex flex-col">
        <p className="text-sm font-light">{author}</p>
        <p className="line-clamp-2 font-semibold">{title}</p>
      </div>
      <p className="font-bold text-primary">{formatRupiah(price)}</p>
    </Link>
  );
};
