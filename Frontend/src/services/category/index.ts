import { axiosInstance } from "@/lib/api";

import {
  CreateCategoryPayload,
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  UpdateCategoryPayload,
} from "./types";

export const getCategories = () => {
  return axiosInstance.get<GetCategoriesResponse>("/category");
};

export const createCategory = (payload: CreateCategoryPayload) => {
  return axiosInstance.post<{ message: string }>("/category", payload);
};

export const getCategoryById = (id: string) => {
  return axiosInstance.get<GetCategoryByIdResponse>(`/category/${id}`);
};

export const updateCategoryById = (params: UpdateCategoryPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/category/${id}`, payload);
};

export const deleteCategoryById = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/category/${id}`);
};
