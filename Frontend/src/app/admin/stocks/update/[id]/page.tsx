import Breadcrumb from "@/components/molecules/breadcrumb";
import StockUpdateForm from "@/components/organisms/stock-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Stok", href: "/admin/stocks" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Stok</h2>
      <StockUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
