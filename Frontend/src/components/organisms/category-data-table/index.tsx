"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DataTable } from "@/components/organisms/data-table";
import { useDeleteCategoryById } from "@/hooks/useDeleteCategoryById";
import { useGetCategories } from "@/hooks/useGetCategories";

import { getColumns } from "./columns";

const CategoryDataTable = () => {
  const router = useRouter();
  const { data, refetch } = useGetCategories();

  const { mutateAsync } = useDeleteCategoryById();

  const handleDeleteCategory = (id: number) => {
    mutateAsync(id.toString()).then((res) => {
      toast.success(res.data.message);
      refetch();
    });
  };

  return (
    <DataTable
      data={data?.data.data ?? []}
      columns={getColumns({ onDeleteButtonClick: handleDeleteCategory })}
      onAddButtonClick={() => router.push("/admin/categories/create")}
    />
  );
};

export default CategoryDataTable;
