"use client";

import React from "react";

import { TanstackQueryProvider, ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store";

import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { role } = useAuthStore((state) => state);
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TanstackQueryProvider>
        {role === "user" && <Navbar />}
        <main>{children}</main>
        {role === "user" && <Footer />}
        <Toaster />
      </TanstackQueryProvider>
    </ThemeProvider>
  );
};
