"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">Oops!</h1>
      <p>Maaf, kami tidak menemukan apa yang anda cari</p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Kembali ke halaman utama</Link>
        </Button>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Coba lagi
        </Button>
      </div>
    </div>
  );
}
