// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { userSchema } from "../types/auth.validator";
import { useAuthStore } from "../store/create.auth.store";
import { useNavigate } from "react-router-dom";

export const useLogin = (setError?: (message: string) => void) => {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_LOGIN_API_URL}`,
        credentials
      );
      const user = userSchema.parse(res.data.user);
      return user;
    },
    onSuccess: (user) => {
      setUser(user);
      if (user.role == "bod") {
        navigate("/board/dashboard");
      } else {
        navigate(`${user.role}/dashboard`);
      }
      if (setError) setError("");
    },
    onError: (err: AxiosError) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Login failed! Please try again.";
      if (setError) setError(message);
      console.error("Login failed", err);
    },
  });
};
