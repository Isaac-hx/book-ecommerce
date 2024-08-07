import Breadcrumb from "@/components/molecules/breadcrumb";
import CategoryDataTable from "@/components/organisms/category-data-table";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Kategori" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Kategori</h2>
      <CategoryDataTable />
    </main>
  );
};

export default Page;
