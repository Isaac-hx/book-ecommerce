import { axiosInstance } from "@/lib/api";

import {
  CreateBookPayload,
  GetAllBookParams,
  GetBookByIdResponse,
  GetBooksResponse,
  UpdateBookPayload,
} from "./types";

export const getBooks = (params: GetAllBookParams, signal?: AbortSignal) => {
  return axiosInstance.get<GetBooksResponse>("/books", {
    signal,
    params: {
      page_index: params.page_index,
      limit: params.limit,
      ...(params.order_by ? { order_by: params.order_by } : {}),
      ...(params.sort_by ? { sort_by: params.sort_by } : {}),
      ...(params.title ? { title: params.title } : {}),
    } as GetAllBookParams,
  });
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
