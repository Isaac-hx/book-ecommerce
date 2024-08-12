import Breadcrumb from "@/components/molecules/breadcrumb";
import UserUpdateForm from "@/components/organisms/user-update-form";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Pengguna", href: "/admin/users" },
          { label: "Ubah Data" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Ubah Data Pengguna</h2>
      <UserUpdateForm id={params.id} />
    </main>
  );
};

export default Page;
