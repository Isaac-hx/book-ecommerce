import { ChevronRight, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { SearchInput, ToggleTheme } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const navMobileItems = [
    {
      label: "Kategori",
      href: "/category",
    },
    {
      label: "Akun Saya",
      href: "/profile",
    },
    {
      label: "Pesanan Saya",
      href: "/order",
    },
  ];

  // TODO: Implement search input
  // TODO: Implement Login & Logout
  // TODO: Create dropdown profile

  return (
    <header className="sticky top-0 flex flex-col gap-y-4 bg-background p-2 shadow">
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
          <User
            className="rounded-full border-2 border-primary text-primary"
            size={28}
          />
          <Link href="/cart">
            <ShoppingCart className="text-primary" size={28} />
          </Link>
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
            {navMobileItems.map((item) => (
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
              <Button variant="destructive" className="w-full">
                Keluar
              </Button>
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
