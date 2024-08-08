"use client";

import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

export const SidebarProfile = () => {
  const profileMenus = [
    {
      label: "Edit Profil",
      path: "/profile",
      icon: User,
    },
    {
      label: "Pesanan Saya",
      path: "/profile/orders",
      icon: ShoppingBag,
    },
  ];

  const pathname = usePathname();

  return (
    <aside className="hidden w-full max-w-52 space-y-4 border-r py-4 md:block">
      {profileMenus.map((menu) => {
        const isActive = pathname === menu.path;
        const Icon = menu.icon;
        return (
          <Link href={menu.path} key={menu.label} className="block">
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start border-b"
            >
              <Icon className="mr-3" />
              {menu.label}
            </Button>
          </Link>
        );
      })}
    </aside>
  );
};
