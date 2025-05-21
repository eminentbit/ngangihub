// hooks/useSession.ts
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/use.auth.store";
import { userSchema, ValidatedUser } from "../types/auth.validator";
import axios from "axios";

const fetchSession = async (
  setUser: (user: ValidatedUser) => void,
  logout: () => void
): Promise<ValidatedUser> => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/session`, {
      withCredentials: true,
    });

    const user = userSchema.parse(res.data.user);
    setUser(user);
    return user;
  } catch (err) {
    console.error("Session fetch failed:", err);
    logout();
    throw new Error("Invalid session or unauthorized");
  }
};

export const useSession = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  return useQuery({
    queryKey: ["session"],
    queryFn: () => fetchSession(setUser, logout),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
  });
};
