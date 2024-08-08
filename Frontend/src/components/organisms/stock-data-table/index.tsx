"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/organisms/data-table";
import { useGetStocks } from "@/hooks/useGetStocks";

import { columns } from "./columns";

const StockDataTable = () => {
  const router = useRouter();
  const { data } = useGetStocks();

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={columns}
      onAddButtonClick={() => router.push("/admin/stocks/create")}
    />
  );
};

export default StockDataTable;
