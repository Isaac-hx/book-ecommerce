import Breadcrumb from "@/components/molecules/breadcrumb";
import PaymentMethodCreateForm from "@/components/organisms/payment-method-create-form";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Rekening", href: "/admin/payment-methods" },
          { label: "Tambah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">
        Tambah Data Rekening
      </h2>
      <PaymentMethodCreateForm />
    </main>
  );
};

export default Page;