import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token: string | null;
  setToken: (token: string) => void;
  role: string | null;
  setRole: (role: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      setToken: (token: string) => set({ token }),
      setRole: (role: string) => set({ role }),
      clearAuth: () => set({ token: null, role: null }),
    }),
    {
      name: "auth",
    },
  ),
);
