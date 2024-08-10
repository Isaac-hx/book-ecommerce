import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

export const profileFormSchema = z.object({
  id: z.number(),
  first_name: z.string().min(1, { message: "Nama depan wajb diisi" }),
  last_name: z.string(),
  avatar_url: z.string(),
  phone: z.string(),
  address: z.string().min(1, { message: "Alamat wajb diisi" }),
});

export const changePasswordFormSchema = z
  .object({
    password: z.string().min(1, { message: "Password lama wajb diisi" }),
    new_password: z.string().min(1, { message: "Password baru wajb diisi" }),
    confirm_new_password: z
      .string()
      .min(1, { message: "Password baru wajb diisi" }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Password baru tidak sama",
    path: ["confirm_new_password"],
  });
