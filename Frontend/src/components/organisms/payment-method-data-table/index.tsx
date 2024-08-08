"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/organisms/data-table";
import { useGetPaymentMethods } from "@/hooks/useGetPaymentMethods";

import { columns } from "./columns";

const PaymentMethodDataTable = () => {
  const router = useRouter();
  const { data } = useGetPaymentMethods();

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={columns}
      onAddButtonClick={() => router.push("/admin/payment-methods/create")}
    />
  );
};

export default PaymentMethodDataTable;
