"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import type { IProps } from "./types";

export const MobileSidebar = ({ menus }: IProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeSheet = () => {
      if (window.outerWidth >= 1024 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", closeSheet);
    return () => window.removeEventListener("resize", closeSheet);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="space-y-4">
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
                          onClick={() => setOpen(false)}
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
