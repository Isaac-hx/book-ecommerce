"use client";

import { ChevronRight, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import React from "react";
import { toast } from "sonner";

import {
  ActionDialog,
  DropdownMenuUser,
  SearchInput,
  ToggleTheme,
} from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store";

export const Navbar = () => {
  const navMobileItems = [
    {
      label: "Akun Saya",
      href: "/profile",
    },
    {
      label: "Pesanan Saya",
      href: "/orders",
    },
  ];

  const { token, clearAuth } = useAuthStore((state) => state);
  const cookies = useCookies();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    router.push("/");
    cookies.remove("token");
    toast.success("Logout Success");
  };

  // TODO: Implement search input

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-y-4 bg-background p-2 shadow">
      {/* Desktop */}
      <nav className="container hidden h-full items-center justify-between gap-4 md:flex">
        <Link href="/" className="text-2xl font-bold text-primary">
          Boomerce
        </Link>
        <Link href="/category" className="text-primary">
          Kategori
        </Link>
        <SearchInput placeholder="Cari Buku..." />
        <div className="flex items-center gap-x-8">
          <ToggleTheme />
          {token ? (
            <div className="flex items-center gap-x-4">
              <DropdownMenuUser />
              <Link href="/cart">
                <ShoppingCart className="text-primary" size={28} />
              </Link>
            </div>
          ) : (
            <Button asChild>
              <Link href="/login">Masuk</Link>
            </Button>
          )}
        </div>
      </nav>
      {/* Mobile */}
      <div className="flex h-full items-center justify-between gap-4 px-2 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          {/* Mobile Sheet Navigation */}
          <SheetContent
            side="left"
            className="flex h-full flex-col overflow-y-auto"
          >
            <Link
              href="/"
              className="text-center text-2xl font-bold text-primary"
            >
              Boomerce
            </Link>
            <Link
              href={"/category"}
              className="flex w-full justify-between border-b p-2 text-primary"
            >
              Kategori <ChevronRight />
            </Link>
            {token &&
              navMobileItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex w-full justify-between border-b p-2 text-primary"
                >
                  {item.label}
                  <ChevronRight />
                </Link>
              ))}
            <div className="mt-auto flex flex-col items-end gap-4">
              <ToggleTheme />
              {token ? (
                <ActionDialog
                  actionHandler={handleLogout}
                  actionName={"Keluar"}
                  title={"Anda Yakin Ingin Keluar?"}
                  description={"Jika anda keluar, anda harus login kembali!"}
                  className="w-full rounded bg-destructive py-2 text-destructive-foreground hover:bg-destructive/90 hover:text-destructive-foreground disabled:bg-primary/40"
                />
              ) : (
                <Button asChild className="w-full">
                  <Link href="/login">Masuk</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="text-2xl font-bold text-primary">
          Boomerce
        </Link>
        <Link href="/cart">
          <ShoppingCart className="text-primary" size={28} />
        </Link>
      </div>
      <div className="px-2 md:hidden">
        <SearchInput placeholder="Cari Buku..." />
      </div>
    </header>
  );
};
