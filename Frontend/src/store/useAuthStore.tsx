import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RoleAvailable } from "@/services/auth/types";

export type DecodedToken = {
  authorized: boolean;
  exp: number;
  role: "string";
  user_id: number;
};

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  role: RoleAvailable | null;
  setRole: (role: RoleAvailable) => void;
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      setToken: (token: string) => set({ token }),
      setRole: (role: RoleAvailable) => set({ role }),
      setUser: (user: DecodedToken | null) => set({ user }),
      clearAuth: () => set({ token: null, role: null, user: null }),
    }),
    {
      name: "auth",
    },
  ),
);
