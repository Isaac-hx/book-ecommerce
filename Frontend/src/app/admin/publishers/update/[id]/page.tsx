import Breadcrumb from "@/components/molecules/breadcrumb";
import PublisherUpdateForm from "@/components/organisms/publisher-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Penerbit", href: "/admin/publishers" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Penerbit</h2>
      <PublisherUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
