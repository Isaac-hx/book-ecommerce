"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { email, requiredStr } from "@/configs/schemas";
import { useRegister } from "@/hooks/useRegister";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import PasswordInput from "../ui/password-input";

const registerFormSchema = z
  .object({
    email,
    password: requiredStr,
    confirmPassword: requiredStr,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Kata sandi tidak sama",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof registerFormSchema>;

const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending, error } = useRegister();

  const handleFormSubmit = ({ email, password }: FormValues) => {
    mutateAsync({ email, password }).then(onSuccess);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  readOnly={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kata sandi</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  readOnly={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ulangi kata sandi</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  readOnly={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormMessage>{error.message}</FormMessage>}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Proses..." : "Daftar"}
        </Button>
        <p className="text-center text-sm">
          Sudah mendaftar?{" "}
          <Link href="/login" className="text-primary">
            Masuk
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
