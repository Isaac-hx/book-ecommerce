"use client";

import {
  Book,
  BookCheck,
  NotebookPen,
  TrendingUp,
  UserPen,
} from "lucide-react";

import Breadcrumb from "@/components/molecules/breadcrumb";
import OrderHistoryChart from "@/components/organisms/order-history-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetResourceSummary } from "@/hooks/useGetResourceSummary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Page = () => {
  const [timeRange, setTimeRange] = useState<"date" | "month" | "year">("date");
  const { data } = useGetResourceSummary();

  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb data={[{ label: "Beranda" }]} />
      <h2 className="text-3xl font-bold tracking-tight">Beranda</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
            <NotebookPen width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total_order || "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buku</CardTitle>
            <Book width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total_books || "-"}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengarang
            </CardTitle>
            <UserPen width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.total_authors || "-"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Penerbit
            </CardTitle>
            <BookCheck width={16} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.total_publisher || "-"}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Riwayat Pesanan
            </CardTitle>
            <TrendingUp width={16} />
          </CardHeader>
          <CardContent>
            <Select
              value={timeRange}
              onValueChange={(value) =>
                setTimeRange(value as "date" | "month" | "year")
              }
            >
              <SelectTrigger
                className="my-2 ml-auto w-[160px] rounded-lg"
                aria-label="Select a value"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="date" className="rounded-lg">
                  View by day
                </SelectItem>
                <SelectItem value="month" className="rounded-lg">
                  View by month
                </SelectItem>
                <SelectItem value="year" className="rounded-lg">
                  View by year
                </SelectItem>
              </SelectContent>
            </Select>
            <OrderHistoryChart filterby={timeRange} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
