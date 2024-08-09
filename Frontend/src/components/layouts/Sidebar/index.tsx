"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import type { IProps } from "./types";

export const Sidebar = ({ menus }: IProps) => {
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
                      {subMenu.icon}
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
