"use client";

import Link from "next/link";
import { useState } from "react";

import RegisterForm from "@/components/organisms/register-form";

const Page = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <main className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center p-5">
      <h1 className="text-3xl">Daftar</h1>
      {isSuccess && (
        <>
          <h2 className="text-xl">Pendaftaran berhasil!</h2>
          <p>
            Lanjut ke proses{" "}
            <Link href="/login" className="text-primary">
              masuk
            </Link>
          </p>
        </>
      )}
      {!isSuccess && (
        <RegisterForm onSuccess={() => setIsSuccess((prev) => !prev)} />
      )}
    </main>
  );
};

export default Page;
