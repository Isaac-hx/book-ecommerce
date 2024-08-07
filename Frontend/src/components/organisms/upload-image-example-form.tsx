"use client";

import { useUploadImage } from "@/hooks/useUploadImage";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const UploadImageExampleForm = () => {
  // Inisialisasi hook
  const { mutateAsync, isPending } = useUploadImage();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();

    // Ubah <form> jadi FormData object
    const formData = new FormData(e.target as HTMLFormElement);

    // Ekstrak File object dari FormData
    const file = formData.get("file"); // karena name="file" sesuai di <input>

    try {
      // Upload file ke firebase
      const response = await mutateAsync(file as File);

      // URL bua submit ke BE
      const url = response.data.data;

      alert(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <Input type="file" name="file" id="file" readOnly={isPending} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Mengirim..." : "Kirim"}
        </Button>
      </form>
    </main>
  );
};

export default UploadImageExampleForm;
