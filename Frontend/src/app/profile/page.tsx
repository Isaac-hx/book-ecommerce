"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useUploadImage } from "@/hooks/useUploadImage";
import { profileFormSchema } from "@/lib/formSchema";

export default function ProfilePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Unggah gambar ke Firebase
      uploadImage(file, {
        onSuccess: (response) => {
          console.log({ response });
          const url = response.data.data;
          setImageUrl(url);
          form.setValue("avatar_url", url);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="flex w-full flex-col justify-center space-y-8"
        >
          <FormField
            control={form.control}
            name="avatar_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full items-center justify-center space-x-4">
                    <label
                      htmlFor="avatar-input"
                      className="relative cursor-pointer"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="Profile Photo"
                          width={96}
                          height={96}
                          className="h-36 w-36 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-36 w-36 rounded-full bg-secondary" />
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
                    <Input type="text" {...field} />
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
                    <Input type="text" {...field} />
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
                  <Input type="tel" {...field} />
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
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Simpan</Button>
        </form>
      </Form>
    </div>
  );
}
