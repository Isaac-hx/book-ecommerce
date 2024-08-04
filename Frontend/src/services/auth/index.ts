import { axiosInstance } from "@/lib/api";

import type { AuthRegisterPayload, AuthRegisterResponse } from "./types";

export const register = (payload: AuthRegisterPayload) => {
  return axiosInstance.post<AuthRegisterResponse>("/register", payload);
};
