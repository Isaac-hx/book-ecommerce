import Breadcrumb from "@/components/molecules/breadcrumb";
import AuthorCreateForm from "@/components/organisms/author-create-form";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Pengarang", href: "/admin/authors" },
          { label: "Tambah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">
        Tambah Data Pengarang
      </h2>
      <AuthorCreateForm />
    </main>
  );
};

export default Page;
