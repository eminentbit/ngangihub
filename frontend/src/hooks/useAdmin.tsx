import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import {
  secureDelete,
  secureGet,
  securePost,
  securePut,
} from "../utils/axiosClient";

// Fetch group
export const useGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => secureGet(`/api/groups/${groupId}`).then((res) => res.data),
    enabled: !!groupId,
  });
};

// Add member
export const useAddMember = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      securePost(`/api/groups/${groupId}/members`, { userId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};

// Delete member
export const useDeleteMember = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      secureDelete(`/api/groups/${groupId}/members/${userId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};

// Edit group settings
export const useEditGroupSettings = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings) =>
      securePut(
        `${import.meta.env.VITE_API_URL}/groups/${groupId}/settings`,
        settings
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};
