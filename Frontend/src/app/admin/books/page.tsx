import { columns } from "@/components/molecules/columns";
import { DataTable } from "@/components/organisms/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import tasks from "./tasks.json";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Buku</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-3xl font-bold tracking-tight">Buku</h2>
      <DataTable data={tasks} columns={columns} />
    </main>
  );
};

export default Page;
