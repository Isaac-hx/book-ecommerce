import { axiosInstance } from "@/lib/api";

import {
  GetUserByIdResponse,
  GetUsersResponse,
  UpdateUserPayload,
} from "./types";

export const getUsers = () => {
  return axiosInstance.get<GetUsersResponse>("/users");
};

export const getUserById = (id: string) => {
  return axiosInstance.get<GetUserByIdResponse>(`/users/${id}`);
};

export const updateUserById = (params: UpdateUserPayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/users/${id}`, payload);
};
