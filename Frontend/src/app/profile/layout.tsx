import { redirect } from "next/navigation";
import { getCookies } from "next-client-cookies/server";

import { SidebarProfile } from "./_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookies = getCookies();
  const token = cookies.get("token");
  const role = cookies.get("role");

  if (!token) redirect("/login");
  if (role !== "user") redirect("/");
  return (
    <div className="container flex min-h-screen w-full">
      <div className="flex flex-1">
        <SidebarProfile />
        <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-2 pt-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
