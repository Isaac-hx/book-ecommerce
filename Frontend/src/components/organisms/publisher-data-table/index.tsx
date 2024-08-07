"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/organisms/data-table";
import { useDeletePublisherById } from "@/hooks/useDeletePublisherById";
import { useGetPublishers } from "@/hooks/useGetPublishers";

import { getColumns } from "./columns";

const PublisherDataTable = () => {
  const router = useRouter();
  const { data, refetch } = useGetPublishers();

  const { mutateAsync } = useDeletePublisherById();

  const handleDeletePublisher = (id: number) => {
    mutateAsync(id.toString()).then((res) => {
      toast.success(res.data.message);
      refetch();
    });
  };

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={getColumns({ onDeleteButtonClick: handleDeletePublisher })}
      onAddButtonClick={() => router.push("/admin/publishers/create")}
    />
  );
};

export default PublisherDataTable;
