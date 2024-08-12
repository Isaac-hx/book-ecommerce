"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetProfileById } from "@/hooks/useGetProfileById";
import { useUpdateProfileById } from "@/hooks/useUpdateProfileById";
import { useUploadImage } from "@/hooks/useUploadImage";
import { profileFormSchema } from "@/lib/formSchema";
import { useAuthStore } from "@/store";

export default function ProfilePage() {
  const { user, _hasHydrated } = useAuthStore();

  const { data: profile } = useGetProfileById(user?.user_id!, !!_hasHydrated);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: user?.user_id,
      first_name: "",
      last_name: "",
      avatar_url: "",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        id: profile.data.data.user_id,
        first_name: profile.data.data.first_name,
        last_name: profile.data.data.last_name,
        avatar_url: profile.data.data.avatar_url,
        address: profile.data.data.address,
        phone: profile.data.data.phone,
      });
    }
  }, [profile, form]);

  const { mutateAsync, isPending } = useUpdateProfileById();

  const handleFormSubmit = (data: z.infer<typeof profileFormSchema>) => {
    mutateAsync(data)
      .then(() => {
        toast.success("Profil berhasil diperbarui");
      })
      .catch((error) => {
        toast.error(error.response?.data.error);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Unggah gambar ke Firebase
      uploadImage(file, {
        onSuccess: (response) => {
          const url = response.data.data;
          form.setValue("avatar_url", url);
        },
        onError: () => {
          toast.error("Gagal mengunggah gambar", {
            description: "Maksimal ukuran gambar 500 KB.",
          });
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Edit Profil</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex w-full flex-col justify-center space-y-8"
        >
          <FormField
            control={form.control}
            name="avatar_url"
            render={() => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full items-center justify-center space-x-4">
                    <label
                      htmlFor="avatar-input"
                      className="relative cursor-pointer"
                    >
                      {form.getValues("avatar_url") ? (
                        <Image
                          src={form.getValues("avatar_url")}
                          alt="Profile Picture"
                          width={144}
                          height={144}
                          className="h-36 w-36 rounded-full object-cover"
                        />
                      ) : (
                        <Image
                          src={"/avatars/01.png"}
                          alt="Profile Picture"
                          width={144}
                          height={144}
                          className="h-36 w-36 rounded-full bg-secondary"
                        />
                      )}
                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={handleImageChange}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Nama Depan</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} readOnly={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel>Nama Belakang</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} readOnly={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} readOnly={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    readOnly={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
}
