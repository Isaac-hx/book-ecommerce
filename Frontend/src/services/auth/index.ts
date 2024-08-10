import { axiosInstance } from "@/lib/api";

import type {
  AuthRegisterPayload,
  AuthRegisterResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "./types";

export const register = (payload: AuthRegisterPayload) => {
  return axiosInstance.post<AuthRegisterResponse>("/register", payload);
};

export const changePassword = (payload: ChangePasswordPayload) => {
  return axiosInstance.post<ChangePasswordResponse>("/change-password", payload);
};
