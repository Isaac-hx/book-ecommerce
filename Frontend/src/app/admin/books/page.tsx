import Breadcrumb from "@/components/molecules/breadcrumb";
import BookDataTable from "@/components/organisms/book-data-table";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[{ label: "Beranda", href: "/admin/home" }, { label: "Buku" }]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Buku</h2>
      <BookDataTable />
    </main>
  );
};

export default Page;
