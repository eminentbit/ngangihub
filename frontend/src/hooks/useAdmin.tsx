import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Fetch group
export const useGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => axios.get(`/api/groups/${groupId}`).then((res) => res.data),
    enabled: !!groupId,
  });
};

// Add member
export const useAddMember = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      axios.post(`/api/groups/${groupId}/members`, { userId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};

// Delete member
export const useDeleteMember = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) =>
      axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/groups/${groupId}/members/${userId}`
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};

// Edit group settings
export const useEditGroupSettings = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings) =>
      axios.put(
        `${import.meta.env.VITE_API_URL}/groups/${groupId}/settings`,
        settings
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
  });
};
