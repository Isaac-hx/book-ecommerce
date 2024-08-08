import { axiosInstance } from "@/lib/api";

import { GetProfileByIdResponse, UpdateProfilePayload } from "./types";

export const getProfileById = (id: number) => {
  return axiosInstance.get<GetProfileByIdResponse>(`/profile/${id}`);
};

export const updateProfileById = (params: UpdateProfilePayload) => {
  const { id, ...payload } = params;
  return axiosInstance.put<{ message: string }>(`/profile/${id}`, payload);
};
