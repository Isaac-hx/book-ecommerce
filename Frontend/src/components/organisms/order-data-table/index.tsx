"use client";

import { DataTable } from "@/components/organisms/data-table";
import { useGetOrders } from "@/hooks/useGetOrders";

import { columns } from "./columns";

const OrderDataTable = () => {
  const { data } = useGetOrders();

  return <DataTable data={data?.data.data ?? []} columns={columns} />;
};

export default OrderDataTable;
