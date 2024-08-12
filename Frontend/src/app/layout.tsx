import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookiesProvider } from "next-client-cookies/server";

import { AppShell } from "@/components/layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boomerce",
  description: "Toko buku terbesar dan terlengkap di Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          <AppShell>{children}</AppShell>
        </CookiesProvider>
      </body>
    </html>
  );
}
