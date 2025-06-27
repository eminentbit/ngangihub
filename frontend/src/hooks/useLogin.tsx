// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/create.auth.store";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/axiosClient";
import { AxiosError } from "axios";
import { User } from "../types/auth.validator";

type LoginFormData = {
  email: string;
  password: string;
};

export const useLogin = (setError?: (message: string) => void) => {
  const setUser = useAuthStore((s) => s.setUser);
  const setAuth = useAuthStore((s) => s.setIsAuthenticated);
  const navigate = useNavigate();

  return useMutation<User, AxiosError, LoginFormData>({
    mutationFn: async (credentials) => {
      const data = await post("/auth/login", credentials);

      if (!data.success || !data.user) {
        throw new Error(data.message || "Login failed");
      }

      return data.user;
    },
    onSuccess: (user) => {
      setAuth(true);
      setUser(user);
      if (user.role == "bod") {
        navigate("/board/dashboard");
      } else if (user.role == "member") {
        navigate("/user/dashboard");
      } else {
        navigate(`/${user.role}/dashboard`);
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
