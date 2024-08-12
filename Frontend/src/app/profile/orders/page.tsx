"use client";

import React from "react";

import { DataTable } from "@/components/organisms/data-table";
import { useGetOrdersUser } from "@/hooks/useGetOrdersUser";

import { columns } from "./columns";

export default function OrdersPage() {
  const { data } = useGetOrdersUser();
  console.log(data);
  return (
    <div className="container mx-auto flex min-h-screen flex-col space-y-8">
      <h1 className="text-3xl font-bold">Pesanan Saya</h1>
      <div>
        <DataTable data={data?.data.data ?? []} columns={columns} />
      </div>
    </div>
  );
}
