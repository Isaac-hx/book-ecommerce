"use client";

import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store";

export function UserNav() {
  const cookies = useCookies();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/");
    cookies.remove("token");
    cookies.remove("role");
    toast.success("Berhasil keluar");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={handleLogout}>Keluar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
