"use client";

import { Trash, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store";

import { ActionDialog } from "../ActionDialog";

export const DropdownMenuUser = () => {
  const router = useRouter();

  const { clearAuth } = useAuthStore((state) => state);
  const cookies = useCookies();

  const handleLogout = () => {
    clearAuth();
    router.push("/");
    cookies.remove("token");
    cookies.remove("role");
    toast.success("Berhasil Keluar");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-primary"
        >
          <span className="sr-only">Open user menu</span>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile");
          }}
        >
          Akun Saya
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/profile/orders");
          }}
        >
          Pesanan Saya
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ActionDialog
            actionHandler={handleLogout}
            trigger={"Keluar"}
            actionName={"Keluar"}
            title={"Anda Yakin Ingin Keluar?"}
            description={"Jika anda keluar, anda harus login kembali!"}
            className="w-full hover:bg-destructive hover:text-destructive-foreground disabled:bg-primary/40"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
