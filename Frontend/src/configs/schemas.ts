import { z } from "zod";

export const optionalStr = z.string();
export const requiredStr = z.string().min(1, { message: "Wajb diisi" });
export const requiredNum = z.coerce
  .number({ invalid_type_error: "Wajib diisi" })
  .gt(0, { message: "Wajib diisi" });
export const requiredISODate = requiredStr.datetime({
  message: "Format waktu harus ISO 8601",
});
export const requiredInt = z.coerce
  .number({ invalid_type_error: "Wajib diisi" })
  .gt(0, { message: "Wajib diisi" })
  .refine((value) => value % 1 === 0, {
    message: "Harus berupa bilangan bulat",
  });
export const email = requiredStr.email({ message: "Email tidak valid" }).trim();
export const optionalFile = z.instanceof(File).nullable();
export const requiredfile = z.instanceof(File, { message: "Wajib diisi" });
export const orderStatus = z.enum(["pending", "paid", "rejected"], {
  message: 'Status harus "pending", "dibayar", atau "ditolak"',
});
export const userStatus = z.enum(["active", "blocked"], {
  message: 'Status harus "aktif" atau "diblokir"',
});
