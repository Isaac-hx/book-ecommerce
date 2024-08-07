"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/organisms/data-table";
import { useDeleteAuthorById } from "@/hooks/useDeleteAuthorById";
import { useGetAuthors } from "@/hooks/useGetAuthors";

import { getColumns } from "./columns";

const AuthorDataTable = () => {
  const router = useRouter();
  const { data, refetch } = useGetAuthors();

  const { mutateAsync } = useDeleteAuthorById();

  const handleDeleteAuthor = (id: number) => {
    mutateAsync(id.toString()).then((res) => {
      toast.success(res.data.message);
      refetch();
    });
  };

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={getColumns({ onDeleteButtonClick: handleDeleteAuthor })}
      onAddButtonClick={() => router.push("/admin/authors/create")}
    />
  );
};

export default AuthorDataTable;
