// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { userSchema } from "../types/auth.validator";
import { useAuthStore } from "../store/create.auth.store";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      console.log("Logging in with credentials:", credentials);
      const res = await axios.post(
        `${import.meta.env.VITE_LOGIN_API_URL}`,
        credentials,
        { withCredentials: true }
      );
      const user = userSchema.parse(res.data.user); // Optional validation
      return user;
    },
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });
};
