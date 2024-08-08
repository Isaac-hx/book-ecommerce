import { axiosInstance } from "@/lib/api";

import {
  CreateStockPayload,
  GetStockByIdResponse,
  GetStocksResponse,
  UpdateStockPayload,
} from "./types";

export const getStocks = () => {
  return axiosInstance.get<GetStocksResponse>("/stock");
};

export const createStock = (payload: CreateStockPayload) => {
  return axiosInstance.post<{ message: string }>("/stock", payload);
};

export const getStockById = (id: string) => {
  return axiosInstance.get<GetStockByIdResponse>(`/stock/${id}`);
};

export const updateStockById = (params: UpdateStockPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/stock/${id}`, payload);
};
