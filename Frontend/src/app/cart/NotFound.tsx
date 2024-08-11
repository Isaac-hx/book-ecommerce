import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NotFound = () => {
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center space-y-4 p-8 md:w-3/4">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <Image
          src={"/empty-cart.png"}
          width={300}
          height={300}
          alt={"empty-cart"}
          className="h-[300px] w-[300px]"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center md:w-1/2">
          <h1 className="text-2xl font-bold">Keranjang Kamu Kosong</h1>
          <p className="text-muted-foreground">
            Keranjang kamu masih kosong lho! Mulai belanja sekarang dan dapatkan
            barang yang kamu inginkan hanya di Boomerce.
          </p>
          <Button asChild className="">
            <Link href={"/"}>Mulai Belanja</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
