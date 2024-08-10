import Breadcrumb from "@/components/molecules/breadcrumb";
import OrderDetail from "@/components/organisms/order-detail";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Pesanan", href: "/admin/orders" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Pesanan</h2>
      <OrderDetail id={params.id} />
    </main>
  );
};

export default Page;
