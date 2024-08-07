import Breadcrumb from "@/components/molecules/breadcrumb";
import PublisherCreateForm from "@/components/organisms/publisher-create-form";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Penerbit", href: "/admin/publishers" },
          { label: "Tambah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">
        Tambah Data Penerbit
      </h2>
      <PublisherCreateForm />
    </main>
  );
};

export default Page;
