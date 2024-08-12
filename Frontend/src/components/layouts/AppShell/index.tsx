"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { TanstackQueryProvider, ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/store";

import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { _hasHydrated, role } = useAuthStore((state) => state);

  useEffect(() => {
    if (_hasHydrated && !pathname.startsWith("/admin") && role === "admin") {
      router.replace("/admin/home");
    }
  }, [_hasHydrated, router, pathname, role]);

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
