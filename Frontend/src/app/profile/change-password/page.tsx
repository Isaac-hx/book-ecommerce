"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import React from "react";
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
import PasswordInput from "@/components/ui/password-input";
import { useChangePassword } from "@/hooks/useChangePassword";
import { changePasswordFormSchema } from "@/lib/formSchema";
import { ChangePasswordErrorResponse } from "@/services/auth/types";

export default function ChangePasswordPage() {
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const { mutateAsync, isPending, error } = useChangePassword();

  const handleFormSubmit = (
    formValues: z.infer<typeof changePasswordFormSchema>,
  ) => {
    mutateAsync(formValues)
      .then(() => {
        toast.success("Password berhasil diperbarui");
      })
      .catch((error: AxiosError<ChangePasswordErrorResponse>) => {
        toast.error(error.response?.data.error);
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Ubah Kata Sandi</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex w-full flex-col justify-center space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi</FormLabel>
                <FormControl>
                  <PasswordInput readOnly={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi baru</FormLabel>
                <FormControl>
                  <PasswordInput readOnly={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ulangi kata sandi baru</FormLabel>
                <FormControl>
                  <PasswordInput readOnly={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error.message}</FormMessage>}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Proses..." : "Ubah Kata Sandi"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
