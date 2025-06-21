import { useMutation } from "@tanstack/react-query";
import { securePost } from "../utils/axiosClient";

export const tokenUrl = "/payment/token";
export const paymentUrl = "/payment/pay";

export const useFetchCampayToken = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await securePost(tokenUrl, {});
      return response.data;
    },
  });

  return {
    getToken: mutation.mutateAsync,
    tokenLoading: mutation.isPending,
    tokenGetError: mutation.error,
  };
};

export const usePayWithMobile = () => {
  const mutation = useMutation({
    mutationFn: async (variables: {
      amount: number;
      description: string;
      from: string;
      groupId: string;
    }) => {
      const response = await securePost(paymentUrl, variables);
      return response.data;
    },
  });

  return {
    initatePayment: mutation.mutateAsync,
    paymentLoading: mutation.isPending,
    paymentError: mutation.error,
  };
};
