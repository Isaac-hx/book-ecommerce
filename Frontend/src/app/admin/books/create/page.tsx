import Breadcrumb from "@/components/molecules/breadcrumb";
import BookCreateForm from "@/components/organisms/book-create-form";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Buku", href: "/admin/books" },
          { label: "Tambah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Tambah Data Buku</h2>
      <BookCreateForm />
    </main>
  );
};

export default Page;
