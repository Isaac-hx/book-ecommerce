import { axiosInstance } from "@/lib/api";

import {
  CreatePublisherPayload,
  GetPublisherByIdResponse,
  GetPublishersResponse,
  UpdatePublisherPayload,
} from "./types";

export const getPublishers = () => {
  return axiosInstance.get<GetPublishersResponse>("/publisher");
};

export const createPublisher = (payload: CreatePublisherPayload) => {
  return axiosInstance.post<{ message: string }>("/publisher", payload);
};

export const getPublisherById = (id: string) => {
  return axiosInstance.get<GetPublisherByIdResponse>(`/publisher/${id}`);
};

export const updatePublisherById = (params: UpdatePublisherPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/publisher/${id}`, payload);
};

export const deletePublisherById = (id: string) => {
  return axiosInstance.delete<{ message: string }>(`/publisher/${id}`);
};
