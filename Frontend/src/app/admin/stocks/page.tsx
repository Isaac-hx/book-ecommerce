import Breadcrumb from "@/components/molecules/breadcrumb";
import StockDataTable from "@/components/organisms/stock-data-table";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[{ label: "Beranda", href: "/admin/home" }, { label: "Stok" }]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Stok</h2>
      <StockDataTable />
    </main>
  );
};

export default Page;
