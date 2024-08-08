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
      className="flex max-h-[445px] w-full max-w-[230px] flex-col gap-4 rounded-lg"
    >
      <Image
        src={cover_url}
        alt={title}
        width={230}
        height={290}
        className="h-[290px] w-full bg-background object-cover p-8 shadow-md shadow-secondary"
      />
      <div className="flex flex-col gap-1 text-center">
        <p className="line-clamp-2 font-semibold">{title}</p>
        <p className="line-clamp-1 text-xs font-light text-muted-foreground">
          {author}
        </p>
      </div>
      <p className="text-center font-bold text-primary">
        {formatRupiah(price)}
      </p>
    </Link>
  );
};
