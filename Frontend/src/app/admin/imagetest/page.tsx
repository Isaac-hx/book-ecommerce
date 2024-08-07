import Breadcrumb from "@/components/molecules/breadcrumb";
import UploadImageExampleForm from "@/components/organisms/upload-image-example-form";

const Page = () => {
  return (
    <main className="relative max-h-full w-0 flex-1 space-y-4 overflow-auto p-8 pt-6">
      <Breadcrumb
        data={[
          { label: "Beranda", href: "/admin/home" },
          { label: "Image Test" },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">Image Test</h2>
      <UploadImageExampleForm />
    </main>
  );
};

export default Page;
