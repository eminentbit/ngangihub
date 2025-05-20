import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const VALIDATE_API_URL = import.meta.env.VITE_API_URL;

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
      const { data } = await axios.get(`${VALIDATE_API_URL}/validate-email`, {
        params: { email },
      });

      return data.valid;
    },
    enabled: !!email, // only run if email is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
/**
 *
 * @param phoneNumber - The phone number to validate
 * @description This hook is used to validate a phone number. It sends a GET request to the server with the phone number as a query parameter. The server responds with a boolean indicating whether the phone number is valid or not upon filling the form.
 * @returns
 */
export const useValidatePhoneNumber = (phoneNumber: string) => {
  return useQuery({
    queryKey: ["validate-phoneNumber", phoneNumber],
    queryFn: async () => {
      const { data } = await axios.get(
        `${VALIDATE_API_URL}/validate-phone-number`,
        {
          params: { phoneNumber },
        }
      );
      return data.valid;
    },
    enabled: !!phoneNumber, // only run if number is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
