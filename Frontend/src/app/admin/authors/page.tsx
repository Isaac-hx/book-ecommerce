import Breadcrumb from "@/components/molecules/breadcrumb";
import AuthorDataTable from "@/components/organisms/author-data-table";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Pengarang" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Pengarang</h2>
      <AuthorDataTable />
    </main>
  );
};

export default Page;
