import { axiosInstance } from "@/lib/api";

import {
  CreateAuthorPayload,
  GetAuthorByIdResponse,
  GetAuthorsResponse,
  UpdateAuthorPayload,
} from "./types";

export const getAuthors = () => {
  return axiosInstance.get<GetAuthorsResponse>("/author");
};

export const createAuthor = (payload: CreateAuthorPayload) => {
  return axiosInstance.post<{ message: string }>("/author", payload);
};

export const getAuthorById = (id: string) => {
  return axiosInstance.get<GetAuthorByIdResponse>(`/author/${id}`);
};

export const updateAuthorById = (params: UpdateAuthorPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/author/${id}`, payload);
};

export const deleteAuthorById = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/author/${id}`);
};
