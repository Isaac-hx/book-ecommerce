import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { type BadgeProps } from "@/components/ui/badge";
import { type OrderStatus } from "@/services/order/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRupiah = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export function formatDate(input: string) {
  const date = new Date(input);
  const formatted = date.toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (formatted === "Invalid Date") return "-";
  return formatted;
}

export const formatKilogram = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "unit",
    unit: "kilogram",
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
};

export const formatCentimeter = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "unit",
    unit: "centimeter",
    unitDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
};

export const getOrderStatusBadgeVariant = (
  status_order: OrderStatus,
): BadgeProps["variant"] => {
  switch (status_order) {
    case "paid":
      return "default";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
};
