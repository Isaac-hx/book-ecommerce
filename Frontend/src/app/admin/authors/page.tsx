import Breadcrumb from "@/components/molecules/breadcrumb";
import { columns } from "@/components/molecules/columns";
import { DataTable } from "@/components/organisms/data-table";

import tasks from "./tasks.json";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[{ label: "Home", href: "/" }, { label: "Pengarang" }]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Pengarang</h2>
      <DataTable data={tasks} columns={columns} />
    </main>
  );
};

export default Page;
