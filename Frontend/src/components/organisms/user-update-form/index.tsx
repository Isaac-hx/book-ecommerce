"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Edit, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { optionalFile, optionalStr, userStatus } from "@/configs/schemas";
import { useGetUserById } from "@/hooks/useGetUserById";
import { useUpdateUserById } from "@/hooks/useUpdateUserById";
import { useUploadImage } from "@/hooks/useUploadImage";

const userUpdateFormSchema = z.object({
  avatar: z.object({
    url: z.string(),
    file: optionalFile,
  }),
  first_name: optionalStr,
  last_name: optionalStr,
  address: optionalStr,
  status: userStatus,
});

type FormValues = z.infer<typeof userUpdateFormSchema>;

const UserUpdateForm = ({ id }: { id: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetUserById(id);
  const { mutateAsync: updateUser, error } = useUpdateUserById();
  const { mutateAsync: uploadImage } = useUploadImage();

  const form = useForm<FormValues>({
    resolver: zodResolver(userUpdateFormSchema),
    values: {
      avatar: {
        url: data?.data.data.avatar_url || "",
        file: null,
      },
      first_name: data?.data.data.first_name || "",
      last_name: data?.data.data.last_name || "",
      address: data?.data.data.address || "",
      status: data?.data.data.status || "active",
    },
  });

  const handleFormSubmit = async (formValues: FormValues) => {
    try {
      let avatar_url = data?.data.data.avatar_url || "";
      setIsLoading(true);
      if (formValues.avatar.file) {
        const response = await uploadImage(formValues.avatar.file);
        avatar_url = response.data.data;
      }
      await updateUser({ ...formValues, id, avatar_url });
      toast.success("Berhasil mengubah data pengguna");
      router.push("/admin/users");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => {
            const first_name: string = data?.data.data.first_name || "";
            const last_name: string = data?.data.data.last_name || "";

            let initial =
              (first_name && first_name.charAt(0).toUpperCase()) || "-";
            if (last_name) initial += last_name.charAt(0).toUpperCase();

            return (
              <div className="relative w-fit">
                <Avatar className="h-40 w-40 ring-8">
                  <AvatarImage src={field.value.url} alt="avatar" />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
                <Button
                  {...(field.value.file
                    ? {
                        onClick: () => {
                          if (field.value.url.startsWith("blob:")) {
                            URL.revokeObjectURL(field.value.url);
                          }
                          field.onChange({
                            url: data?.data.data.avatar_url || "",
                            file: null,
                          });
                        },
                      }
                    : { asChild: true })}
                  className="absolute bottom-0 right-0 h-fit rounded-full p-2"
                >
                  {field.value.file ? (
                    <X />
                  ) : (
                    <label htmlFor="avatar">
                      <Edit />
                    </label>
                  )}
                </Button>
                <input
                  hidden
                  type="file"
                  accept="image/png,image/jpeg"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      field.onChange({
                        url: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0],
                      });
                    }
                    e.target.value = "";
                  }}
                />
              </div>
            );
          }}
        />
        <FormItem>
          <FormLabel>Bergabung pada</FormLabel>
          <FormControl>
            <Input
              type="text"
              readOnly
              value={
                (data?.data.data.created_at &&
                  format(data.data.data.created_at, "dd MMMM yyyy")) ||
                ""
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Depan</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Belakang</FormLabel>
              <FormControl>
                <Input type="text" readOnly={isLoading} {...field} />
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
                  readOnly={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">aktif</SelectItem>
                      <SelectItem value="blocked">diblokir</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error.message}</FormMessage>}
        <div className="flex justify-end">
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? "Mengirim..." : "Kirim"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserUpdateForm;
