import { axiosInstance } from "@/lib/api";

import { Cart, CartItem, CreateCartPayload, UpdateCartPayload } from "./types";

export const addToCart = (payload: CreateCartPayload) => {
  return axiosInstance.post<{ message: string }>("/cart", payload);
};

export const getCart = () => {
  return axiosInstance.get<Cart>("/cart");
};

export const updateCart = (data: UpdateCartPayload) => {
  return axiosInstance.put<{ message: string }>("/cart", data);
};

export const deleteCart = (book_id: number) => {
  return axiosInstance.delete<{ message: string }>("/cart", {
    data: {
      book_id,
    },
  });
};
