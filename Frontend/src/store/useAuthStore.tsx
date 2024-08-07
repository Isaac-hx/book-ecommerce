import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RoleAvailable } from "@/services/auth/types";

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  role: RoleAvailable | null;
  setRole: (role: RoleAvailable) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setToken: (token: string) => set({ token }),
      setRole: (role: RoleAvailable) => set({ role }),
      clearAuth: () => set({ token: null, role: null }),
    }),
    {
      name: "auth",
    },
  ),
);
