import { create } from "zustand";
import { persist } from "zustand/middleware";

type role = "admin" | "user";

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  role: role | null;
  setRole: (role: role) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setToken: (token: string) => set({ token }),
      setRole: (role: role) => set({ role }),
      clearAuth: () => set({ token: null, role: null }),
    }),
    {
      name: "auth",
    },
  ),
);
