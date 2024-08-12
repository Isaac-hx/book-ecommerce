import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-10 bg-background p-4 shadow-2xl shadow-black">
      <div className="container flex h-full w-full flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/" className="text-3xl font-bold text-primary">
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>
        <p className="text-center text-sm md:text-left md:text-base">
          Toko buku online terbesar, terlengkap dan terpercaya di Indonesia.
        </p>
      </div>
    </footer>
  );
};
