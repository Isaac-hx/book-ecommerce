"use client";

import React from "react";

import { TanstackQueryProvider, ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store";

import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore((state) => state);
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TanstackQueryProvider>
        {role !== "admin" && <Navbar />}
        <main>{children}</main>
        {role !== "admin" && <Footer />}
        <Toaster />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
};
