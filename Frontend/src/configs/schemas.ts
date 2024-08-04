import { z } from "zod";

export const requiredStr = z.string().min(1, { message: "Wajb diisi" });
export const email = requiredStr.email({ message: "Email tidak valid" }).trim();
