import { useQuery } from "@tanstack/react-query";
import { secureGet } from "../utils/axiosClient";
import useUserStore from "../store/create.user.store";

interface UserPaymentStatus {
  paymentStatus: boolean;
  sucess: boolean;
}

const fetchPaymentStatus = async (
  groupId: string,
  userIds: string[]
): Promise<UserPaymentStatus> => {
  const response = await secureGet(`/user/group/${groupId}/payment-status`, {
    params: { userIds: userIds.join(",") },
  });
  console.log(response.data);
  return response.data;
};

const useUserPaymentStatus = (userIds: string[], groupId: string) => {
  const setHasPaidThisMonth = useUserStore(
    (state) => state.setHasPaidThisMonth
  );

  const query = useQuery({
    queryKey: ["paymentStatus", userIds, groupId],
    queryFn: async () => fetchPaymentStatus(groupId, userIds),
    enabled: userIds.length > 0 && !!groupId,
    select: (data) => {
      setHasPaidThisMonth(data.paymentStatus);
      return data.paymentStatus;
    },
    retry: 2,
  });

  return {
    hasPaidThisMonth: query.data ?? {},
    isLoading: query.isLoading,
    error: query.error,
  };
};

export default useUserPaymentStatus;
