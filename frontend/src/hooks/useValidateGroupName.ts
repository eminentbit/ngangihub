import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useValidateGroupName = (groupName: string) => {
  return useQuery({
    queryKey: ["validate-group-name", groupName],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/validate-group-name`, {
        params: { groupName },
      });
      return data.valid;
    },
    enabled: !!groupName, // only run if groupName is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
