import Breadcrumb from "@/components/molecules/breadcrumb";
import OrderDataTable from "@/components/organisms/order-data-table";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[{ label: "Beranda", href: "/admin/home" }, { label: "Pesanan" }]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Pesanan</h2>
      <OrderDataTable />
    </main>
  );
};

export default Page;
