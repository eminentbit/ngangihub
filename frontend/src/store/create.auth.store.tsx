// store/useAuthStore.ts
import { create } from "zustand";

type User = {
  email: string;
  role: "bod" | "user" | "member" | "admin";
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
