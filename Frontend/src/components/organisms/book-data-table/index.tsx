"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/organisms/data-table";
import { useDeleteBookById } from "@/hooks/useDeleteBookById";
import { useGetBooks } from "@/hooks/useGetBooks";
import { GetAllBookParams } from "@/services/book/types";

import { getColumns } from "./columns";

const BookDataTable = () => {
  const [params, setParams] = useState<GetAllBookParams>({
    limit: 10,
    page_index: 0,
  });

  const router = useRouter();
  const { data, refetch } = useGetBooks(params);

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
      manualPagination
      rowCount={data?.data.total_data}
      pagination={{ pageIndex: params.page_index!, pageSize: params.limit! }}
      onPaginationChange={({ pageIndex, pageSize }) =>
        setParams((prev) => ({
          ...prev,
          page_index: pageIndex,
          limit: pageSize,
        }))
      }
    />
  );
};

export default BookDataTable;
