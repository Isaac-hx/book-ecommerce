"use client";

import { DataTable } from "@/components/organisms/data-table";
import { useGetUsers } from "@/hooks/useGetUsers";

import { columns } from "./columns";

const AuthorDataTable = () => {
  const { data } = useGetUsers();

  return (
    <DataTable
      data={
        data?.data.data.filter((user) => user.email !== "admin@gmail.com") ?? []
      }
      columns={columns}
    />
  );
};

export default AuthorDataTable;
