import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

export const profileFormSchema = z.object({
  first_name: z.string().min(1, { message: "Nama depan wajb diisi" }),
  last_name: z.string(),
  avatar_url: z.string(),
  phone: z.string(),
  address: z.string().min(1, { message: "Alamat wajb diisi" }),
});
