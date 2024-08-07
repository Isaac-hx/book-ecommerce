import Link from "next/link";
import { redirect } from "next/navigation";
import { getCookies } from "next-client-cookies/server";
import { type PropsWithChildren } from "react";

import { UserNav } from "@/components/molecules/user-nav";
import Sidebar from "@/components/organisms/sidebar";

const Layout = ({ children }: PropsWithChildren) => {
  const cookies = getCookies();
  const token = cookies.get("token");
  const role = cookies.get("role");

  if (!token) redirect("/login");
  if (role !== "admin") redirect("/")

  return (
    <div className="flex h-svh flex-col bg-background">
      <header className="w-full border-b bg-background">
        <div className="flex h-14 items-center px-6">
          <Link href="/">Boomerce</Link>
          <div className="ml-auto">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex h-0 flex-1">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
