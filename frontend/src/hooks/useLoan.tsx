import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoanRequestPayload {
  amount: number;
  term: number;
  purpose: string;
}

interface LoanResponse {
  id: string;
  status: string;
}

const requestLoan = async (
  payload: LoanRequestPayload
): Promise<LoanResponse> => {
  const res = await axios.post("/api/loans/request", payload);
  return res.data;
};

export const useRequestLoan = () => {
  const { mutateAsync, ...rest } = useMutation<
    LoanResponse,
    Error,
    LoanRequestPayload
  >({
    mutationFn: requestLoan,
  });

  return {
    requestLoan: mutateAsync,
    ...rest,
  };
};
