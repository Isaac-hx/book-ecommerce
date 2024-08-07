import Breadcrumb from "@/components/molecules/breadcrumb";
import CategoryUpdateForm from "@/components/organisms/category-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Kategori", href: "/admin/categories" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Kategori</h2>
      <CategoryUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
