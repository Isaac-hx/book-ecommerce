import Link from "next/link";
import { type PropsWithChildren } from "react";

import { UserNav } from "@/components/molecules/user-nav";
import Sidebar from "@/components/organisms/sidebar";

const Layout = ({ children }: PropsWithChildren) => {
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
