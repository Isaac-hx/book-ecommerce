"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/molecules/data-table-column-header";
import { DataTableRowActions } from "@/components/molecules/data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { Author } from "@/services/author/types";

type Params = {
  onDeleteButtonClick: (id: number) => void;
};

export const getColumns = ({
  onDeleteButtonClick,
}: Params): ColumnDef<Author>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("name")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        updatePageUrl={`/admin/authors/update/${row.original.ID}`}
        onDeleteButtonClick={() => onDeleteButtonClick(row.original.ID)}
      />
    ),
  },
];
