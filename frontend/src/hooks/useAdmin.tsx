import { useAdminState } from "../store/create.admin.store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  secureGet,
  securePost,
  securePut,
  secureDelete,
} from "../utils/axiosClient";
import { AxiosError } from "axios";
import { User } from "../types/auth.validator";

// Exact Group shape as defined by backend
export interface Group {
  _id: string;
  name: string;
  description?: string;
  groupMembers: User[];
  memberContributions: Array<{
    totalAmountPaid: number;
    member: { _id: string; name: string; email: string };
  }>;
  payoutHistory?: { date: string; member: User }[];
  nextMeeting?: string;
  rules?: string;
  status?: string;
  startDate?: string;
  adminId: string;
  contributionFrequency?: string;
  contributionAmount?: number;
  totalFunds?: number;
  invitedMembers?: Array<{ email: string; status: string }>;
  createdAt: string;
}

export type Member = User & {
  initials: string;
  name: string;
};

export interface InvitedMember {
  email: string;
  status: string;
}
export interface GroupSettings {
  contributionAmount?: number;
  paymentType?: string;
  privacy?: string;
}

// Hook: fetch all groups and sync to store
export function useFetchGroups() {
  const setGroups = useAdminState((s) => s.setGroups);

  const query = useQuery<Group[], AxiosError>({
    queryKey: ["groups"],
    queryFn: () =>
      secureGet("/admin/groups").then((res) => {
        return res.data;
      }),
    select: (data) => {
      setGroups(data);
      return data;
    },
    // onError: (err) => console.error("Failed to fetch groups:", err.message),
  });

  return {
    groups: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useActivityTimeLine(groupId: string) {
  const setActivityTimeline = useAdminState((s) => s.setActivityTimeline);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = useQuery<any, AxiosError>({
    queryKey: ["group", groupId, "activityTimeline"],
    queryFn: () =>
      secureGet(`/admin/group/${groupId}/activity-timeline`).then(
        (res) => res.data.timeline
      ),
    enabled: Boolean(groupId),
    select: (data) => {
      setActivityTimeline(data);
      return data;
    },
  });

  return {
    activityTimeline: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
  };
}

export const useGroupInfo = (groupId: string) => {
  const query = useQuery<Group, AxiosError>({
    queryKey: ["group", groupId],
    queryFn: () => secureGet(`/admin/group/${groupId}`).then((res) => res.data),
    enabled: Boolean(groupId),
  });

  return {
    groupInfo: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
  };
};

export const useGroupActivities = (groupId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = useQuery<any[], AxiosError>({
    queryKey: ["group", groupId, "activities"],
    queryFn: () =>
      secureGet(`/admin/group/${groupId}/recent-activities`).then(
        (res) => res.data
      ),
    enabled: Boolean(groupId),
  });

  console.log(`/admin/group/${groupId}/recent-activities`);

  return {
    activities: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
};

// Hook: fetch members for current groupId in store
export function useFetchMembers(groupId: string) {
  const setMembers = useAdminState((s) => s.setMembers);

  const query = useQuery<User[], AxiosError>({
    queryKey: ["admin", "members", groupId],
    queryFn: () =>
      secureGet(`/admin/group/${groupId}/members`).then(
        (res) => res.data.members
      ),
    enabled: Boolean(groupId), // run only if groupId exists
    select: (data) => {
      setMembers(data);
      return data;
    },
    // onError: (err) => console.error("Failed to fetch members:", err.message),
  });

  return {
    members: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

// Hook: fetch invited members for current groupId
export function useFetchInvitedMembers(groupId: string) {
  const setInvited = useAdminState((s) => s.setInvitedMembers);

  const query = useQuery<InvitedMember[], AxiosError>({
    queryKey: ["admin", "invitedMembers", groupId],
    queryFn: () =>
      secureGet(`/admin/group/${groupId}/invited-members`).then(
        (res) => res.data
      ),
    enabled: Boolean(groupId),
    select: (data) => {
      setInvited(data);
      return data;
    },
    // onError: (err) =>
    // console.error("Failed to fetch invited members:", err.message),
  });

  return {
    invitedMembers: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

// Hook: invite a member by email
export function useInviteMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation<InvitedMember, AxiosError, string>({
    mutationFn: (email) =>
      securePost(`/admin/group/${groupId}/invite`, { email }).then(
        (res) => res.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "invitedMembers", groupId],
      });
    },
    onError: (err) => console.error("Invite failed:", err.message),
  });
}

// Hook: add a member
export function useAddMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (email) =>
      securePost(`/admin/group/${groupId}/add-member`, { email }).then(
        () => {}
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "members", groupId],
      });
    },
    onError: (err) => console.error("Add member failed:", err.message),
  });
}

// Hook: remove a member
export function useRemoveMember() {
  const groupId = useAdminState((s) => s.groupId)!;
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (userId) =>
      secureDelete(`/admin/group/${groupId}/members/${userId}`).then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "members", groupId],
      });
    },
    onError: (err) => console.error("Remove member failed:", err.message),
  });
}

// Hook: update group settings
export function useEditGroupSettings() {
  const groupId = useAdminState((s) => s.groupId)!;
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, GroupSettings>({
    mutationFn: (settings) =>
      securePut(`/admin/group/${groupId}/settings`, settings).then(
        (res) => res.data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "groups"] });
    },
    onError: (err) => console.error("Update settings failed:", err.message),
  });
}
