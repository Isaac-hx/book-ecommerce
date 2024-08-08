import { axiosInstance } from "@/lib/api";

import {
  CreateBookPayload,
  GetBookByIdResponse,
  GetBooksResponse,
  UpdateBookPayload,
} from "./types";

export const getBooks = () => {
  return axiosInstance.get<GetBooksResponse>("/books");
};

export const createBook = (payload: CreateBookPayload) => {
  return axiosInstance.post<{ message: string }>("/books", payload);
};

export const getBookById = (id: string) => {
  return axiosInstance.get<GetBookByIdResponse>(`/books/${id}`);
};

export const updateBookById = (params: UpdateBookPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/books/${id}`, payload);
};

export const deleteBookById = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/books/${id}`);
};
