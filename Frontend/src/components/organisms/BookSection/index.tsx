import Link from "next/link";
import React from "react";

type BookSectionProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

export const BookSection = ({ children, title, href }: BookSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold md:text-2xl">{title}</h2>
        <Link href={href} className="text-primary hover:underline">
          Lihat semua
        </Link>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
      <hr />
    </div>
  );
};
