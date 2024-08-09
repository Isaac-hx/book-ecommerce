"use client";

import {
  Book,
  BookCheck,
  CreditCard,
  House,
  NotebookPen,
  Package,
  Tags,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const menus = [
  {
    label: "Akses cepat",
    children: [
      {
        path: "/admin/home",
        label: "Beranda",
        icon: House,
      },
    ],
  },
  {
    label: "Master",
    children: [
      {
        path: "/admin/authors",
        label: "Pengarang",
        icon: UserPen,
      },
      {
        path: "/admin/publishers",
        label: "Penerbit",
        icon: BookCheck,
      },
      {
        path: "/admin/categories",
        label: "Kategori",
        icon: Tags,
      },
      {
        path: "/admin/books",
        label: "Buku",
        icon: Book,
      },
      {
        path: "/admin/stocks",
        label: "Stok",
        icon: Package,
      },
      {
        path: "/admin/payment-methods",
        label: "Rekening",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Transaksi",
    children: [
      {
        path: "/admin/orders",
        label: "Pesanan",
        icon: NotebookPen,
      },
    ],
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-full max-w-52 space-y-4 border-r py-4 lg:block">
      {menus.map((menu) => {
        return (
          <div className="px-3 py-2" key={menu.label}>
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {menu.label}
            </h2>
            <div className="space-y-1">
              {menu.children.map((subMenu) => {
                const Icon = subMenu.icon;
                const isActive = pathname.startsWith(subMenu.path);

                return (
                  <Link
                    href={subMenu.path}
                    key={subMenu.label}
                    className="block"
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Icon className="mr-3" />
                      {subMenu.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
