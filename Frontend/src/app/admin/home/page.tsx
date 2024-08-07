import { Book, CreditCard, HandCoins, UserPen } from "lucide-react";

import Breadcrumb from "@/components/molecules/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb data={[{ label: "Beranda" }]} />
      <h2 className="text-3xl font-bold tracking-tight">Beranda</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <HandCoins width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp12,000,000</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <UserPen width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books</CardTitle>
            <Book width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">300</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
