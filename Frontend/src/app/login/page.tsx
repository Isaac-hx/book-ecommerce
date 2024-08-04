"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/api";
import { loginFormSchema } from "@/lib/formSchema";
import {
  AuthLoginErrorResponse,
  AuthLoginResponse,
} from "@/services/auth/types";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const login = async (values: z.infer<typeof loginFormSchema>) => {
    const { data: response } = await axiosInstance.post("/login", values);
    return response;
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data: AuthLoginResponse) => {
      toast.success(data.message);
      if (data.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      localStorage.setItem("token", data.token);
    },
    onError: (error: AxiosError<AuthLoginErrorResponse>) => {
      toast.error(error.response?.data.error);
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <FormMessage className="text-red-500">
                  {error.response?.data.error}
                </FormMessage>
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
