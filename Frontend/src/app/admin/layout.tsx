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
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCookies } from "next-client-cookies/server";
import { type PropsWithChildren } from "react";

import { MobileSidebar, Sidebar } from "@/components/layouts";
import { UserNav } from "@/components/molecules/user-nav";

const menus = [
  {
    label: "Akses cepat",
    children: [
      {
        path: "/admin/home",
        label: "Beranda",
        icon: <House className="mr-3" />,
      },
    ],
  },
  {
    label: "Master",
    children: [
      {
        path: "/admin/authors",
        label: "Pengarang",
        icon: <UserPen className="mr-3" />,
      },
      {
        path: "/admin/publishers",
        label: "Penerbit",
        icon: <BookCheck className="mr-3" />,
      },
      {
        path: "/admin/categories",
        label: "Kategori",
        icon: <Tags className="mr-3" />,
      },
      {
        path: "/admin/books",
        label: "Buku",
        icon: <Book className="mr-3" />,
      },
      {
        path: "/admin/stocks",
        label: "Stok",
        icon: <Package className="mr-3" />,
      },
      {
        path: "/admin/payment-methods",
        label: "Rekening",
        icon: <CreditCard className="mr-3" />,
      },
    ],
  },
  {
    label: "Transaksi",
    children: [
      {
        path: "/admin/orders",
        label: "Pesanan",
        icon: <NotebookPen className="mr-3" />,
      },
    ],
  },
];

const Layout = ({ children }: PropsWithChildren) => {
  const cookies = getCookies();
  const token = cookies.get("token");
  const role = cookies.get("role");

  if (!token) redirect("/login");
  if (role !== "admin") redirect("/");

  return (
    <div className="flex h-svh flex-col bg-background">
      <header className="w-full border-b bg-background">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="boomerce_logo"
                width={100}
                height={50}
              />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
            <MobileSidebar menus={menus} />
          </div>
        </div>
      </header>
      <div className="flex h-0 flex-1">
        <Sidebar menus={menus} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
