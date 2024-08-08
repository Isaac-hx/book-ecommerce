import Breadcrumb from "@/components/molecules/breadcrumb";
import AuthorUpdateForm from "@/components/organisms/author-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Pengarang", href: "/admin/authors" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Pengarang</h2>
      <AuthorUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
