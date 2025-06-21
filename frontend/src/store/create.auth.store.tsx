import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/auth.validator";
import { securePost } from "../utils/axiosClient";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: true,
      setUser: (user: User | null) => set({ user }),
      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
      setLoading: (loading: boolean) => set({ loading }),
      logout: async () => {
        set({ user: null, isAuthenticated: false });
        await securePost("/auth/logout", {});
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
