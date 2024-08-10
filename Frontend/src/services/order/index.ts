import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance } from "@/lib/api";

import {
  GetOrderByIdResponse,
  GetOrdersResponse,
  UpdateOrderPayload,
} from "./types";

export const getOrders = () => {
  return axiosInstance.get<GetOrdersResponse>("/admin/order");
};

export const getOrderById = (id: string) => {
  return axiosInstance.get<GetOrderByIdResponse>(`/admin/order/${id}`);
};

export const updateOrderById = (params: UpdateOrderPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/admin/order/${id}`, payload);
};
