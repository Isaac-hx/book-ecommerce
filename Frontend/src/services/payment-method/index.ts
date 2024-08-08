import { axiosInstance } from "@/lib/api";

import {
  CreatePaymentMethodPayload,
  GetPaymentMethodByIdResponse,
  GetPaymentMethodsResponse,
  UpdatePaymentMethodPayload,
} from "./types";

export const getPaymentMethods = () => {
  return axiosInstance.get<GetPaymentMethodsResponse>("/payment-method");
};

export const createPaymentMethod = (payload: CreatePaymentMethodPayload) => {
  return axiosInstance.post<{ message: string }>("/payment-method", payload);
};

export const getPaymentMethodById = (id: string) => {
  return axiosInstance.get<GetPaymentMethodByIdResponse>(
    `/payment-method/${id}`,
  );
};

export const updatePaymentMethodById = (params: UpdatePaymentMethodPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(
    `/payment-method/${id}`,
    payload,
  );
};

export const deletePaymentMethodById = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/payment-method/${id}`);
};
