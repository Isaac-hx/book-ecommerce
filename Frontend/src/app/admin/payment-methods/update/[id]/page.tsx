import Breadcrumb from "@/components/molecules/breadcrumb";
import PaymentMethodUpdateForm from "@/components/organisms/payment-method-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Rekening", href: "/admin/payment-methods" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Rekening</h2>
      <PaymentMethodUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
