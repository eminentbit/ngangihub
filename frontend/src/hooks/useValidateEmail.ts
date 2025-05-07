import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

/**
 *
 * @param email - The email address to validate
 * @description This hook is used to validate an email address. It sends a GET request to the server with the email address as a query parameter. The server responds with a boolean indicating whether the email is valid or not upon filling the form.
 * @returns
 */
export const useValidateEmail = (email: string) => {
  return useQuery({
    queryKey: ["validate-email", email],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/validate-email`, {
        params: { email },
      });
      return data.valid;
    },
    enabled: !!email, // only run if email is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
