"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/organisms/data-table";
import { useDeleteBookById } from "@/hooks/useDeleteBookById";
import { useGetBooks } from "@/hooks/useGetBooks";

import { getColumns } from "./columns";

const BookDataTable = () => {
  const router = useRouter();
  const { data, refetch } = useGetBooks({});

  const { mutateAsync } = useDeleteBookById();

  const handleDeleteBook = (id: number) => {
    mutateAsync(id.toString()).then((res) => {
      toast.success(res.data.message);
      refetch();
    });
  };

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={getColumns({ onDeleteButtonClick: handleDeleteBook })}
      onAddButtonClick={() => router.push("/admin/books/create")}
    />
  );
};

export default BookDataTable;
