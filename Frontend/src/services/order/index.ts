import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance } from "@/lib/api";

import {
  CreateOrderPayload,
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

export const createOrder = (payload: CreateOrderPayload) => {
  return axiosInstance.post<{ message: string }>(`/order`, payload);
};

export const getOrdersUser = () => {
  return axiosInstance.get<GetOrdersResponse>("/order");
};

export const getOrderUserById = (id: string) => {
  return axiosInstance.get<GetOrderByIdResponse>(`/order/${id}`);
};

export const updateOrderUserById = (params: UpdateOrderPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/order/${id}`, payload);
};
