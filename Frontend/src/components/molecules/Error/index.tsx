"use client";

import { useRouter } from "next/navigation";

type ErrorMessageProps = {
  message: string;
  backTo?: string;
};

export const ErrorMessage = ({ message, backTo }: ErrorMessageProps) => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-6xl font-bold text-primary">Oops...</h1>
      <h2 className="text-xl">Halaman tidak ditemukan</h2>
      <p className="my-2 text-lg">Info: {message}</p>
      <button
        onClick={() => router.push(backTo ? backTo : "/")}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Kembali
      </button>
    </div>
  );
};
