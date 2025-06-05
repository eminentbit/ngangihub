import { create } from "zustand";
import { securePost, secureGet } from "../utils/axiosClient";
import { AxiosError } from "axios";
import { GroupRequest } from "../types/group.request";

export interface Member {
  id: string;
  initials: string;
  name: string;
  role: string;
  status: "active" | "inactive";
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  groupMembers: Member[];
  nextMeeting: string;
  rules: string;
  status: string;
  totalFunds: number;
  createdAt: string;
}

interface AdminState {
  groupId: string | null;
  members: Member[];
  groups: Group[];
  email: string;
  selectedMember: Member | null;
  isEditingSettings: boolean;
  groupInfo: Group | null;
  draftInfo: GroupRequest | null;
  nextMeeting: string | null;
  loading: boolean;
  error: string | null;
  // Submission stats
  submissionStats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  } | null;
  statusHistory:
    | null
    | {
        id: string;
        groupName: string;
        currentStatus: string;
        timeline: {
          current: boolean;
          status: string;
          date: string;
          time: string;
          description: string;
          completed: boolean;
        }[];
      }[];

  fetchSubmissionStats: () => Promise<void>;
  fetchDraftInfo: () => Promise<void>;
  fetchStatusHistory: () => Promise<void>;

  // Setters
  setGroupId: (id: string) => void;
  setMembers: (members: Member[]) => void;
  selectMember: (member: Member) => void;
  toggleEditSettings: () => void;

  // CRUD actions
  fetchMembers: () => Promise<void>;
  fetchGroups: () => Promise<void>;
  fetchGroupInfo: (groupId: string, withToken: boolean) => Promise<void>;
  createGroup: (group: { name: string; description: string }) => Promise<void>;
  updateGroup: (group: {
    id: string;
    name: string;
    description: string;
    nextMeeting?: string;
  }) => Promise<void>;
  addMember: (member: Member) => Promise<void>;
  removeMember: (memberId: string) => void;
  updateMember: (member: Member) => void;
  recentActivity: {
    createdGroups: Group[];
    pendingGroups: GroupRequest[];
  } | null;
  fetchRecentActivity: () => Promise<void>;
}

export const useAdminState = create<AdminState>((set, get) => ({
  groupId: null,
  email: "",
  members: [],
  groups: [],
  selectedMember: null,
  isEditingSettings: false,
  groupInfo: null,
  loading: false,
  nextMeeting: null,
  error: null,
  submissionStats: null,
  recentActivity: null,
  draftInfo: null,
  statusHistory: null,

  setGroupId: (id: string) => set({ groupId: id }),
  setMembers: (members: Member[]) => set({ members }),
  selectMember: (member: Member) => set({ selectedMember: member }),
  toggleEditSettings: () =>
    set((state) => ({ isEditingSettings: !state.isEditingSettings })),

  fetchMembers: async () => {
    const { groupId } = get();
    if (!groupId) return;

    set({ loading: true, error: null });
    try {
      const response = await secureGet(`/admin/group/${groupId}/members`, {
        silent: true,
      });
      set({ members: response.data.members, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({
          error: err.message || "Failed to fetch members",
          loading: false,
        });
      }
    }
  },

  addMember: async (member: Member) => {
    set({ loading: true, error: null });
    try {
      await securePost(
        "/admin/add-member",
        {
          ...member,
          groupId: get().groupId,
        }
        // { silent: true }
      );
      set((state) => ({
        members: [...state.members, member],
        loading: false,
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message || "Failed to add member", loading: false });
      }
    }
  },

  removeMember: (memberId: string) => {
    set((state) => ({
      members: state.members.filter((m) => m.id !== memberId),
    }));
  },

  updateMember: (updated: Member) => {
    set((state) => ({
      members: state.members.map((m) => (m.id === updated.id ? updated : m)),
    }));
  },

  fetchGroupInfo: async (groupId: string, withToken = true) => {
    set({ loading: true, error: null });
    try {
      let url;
      if (withToken) {
        url = `/admin/group/${groupId}`;
      } else {
        url = "/admin/group/get-info";
      }
      const response = await secureGet(url, {
        silent: true,
        params: { groupId },
      });
      set({ loading: false, groupInfo: response.data });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({
          error: err.message || "Failed to fetch group info",
          loading: false,
        });
      }
    }
  },

  fetchDraftInfo: async () => {
    set({ loading: true, error: null });
    try {
      const response = await secureGet("/admin/drafts", {
        silent: true,
        params: { groupId: get().groupId },
      });
      set({ draftInfo: response.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({
          error: err.message || "Failed to fetch draft info",
          loading: false,
        });
      }
    }
  },

  fetchGroups: async () => {
    set({ loading: true, error: null });
    try {
      const response = await secureGet("/admin/groups", {
        silent: true,
      });
      console.log("Fetched groups:", response.data);
      set({ loading: false, groups: response.data });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message || "Failed to fetch groups", loading: false });
      }
    }
  },

  createGroup: async (group: { name: string; description: string }) => {
    set({ loading: true, error: null });
    try {
      await securePost("/admin/groups", group);
      set({ loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message || "Failed to create group", loading: false });
      }
    }
  },
  updateGroup: async (group: {
    id: string;
    name: string;
    description: string;
  }) => {
    set({ loading: true, error: null });
    try {
      await securePost(`/admin/groups/${group.id}`, group);
      set({ loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message || "Failed to update group", loading: false });
      }
    }
  },

  fetchSubmissionStats: async () => {
    set({ loading: true, error: null });
    try {
      set({ email: localStorage.getItem("tempAdminEmail") || "" });
      const response = await secureGet("/admin/submission-stats", {
        params: { groupId: get().groupId, email: get().email },
      });
      set({ submissionStats: response.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({
          error: err.message || "Failed to fetch submission stats",
          loading: false,
        });
      }
    }
  },

  fetchStatusHistory: async () => {
    set({ loading: true, error: null });
    try {
      const response = await secureGet("/admin/status-history", {
        params: { groupId: get().groupId, email: get().email },
      });
      console.log("Fetched status history:", response.data);
      set({ statusHistory: response.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({
          error: err.message || "Failed to fetch status history",
          loading: false,
        });
      }
    }
  },

  fetchRecentActivity: async () => {
    set({ loading: true, error: null });
    try {
      set({ email: localStorage.getItem("tempAdminEmail") || "" });
      const res = await secureGet("/admin/recent-activity", {
        params: { email: get().email, groupId: get().groupId },
      });
      console.log("Fetched submission stats:", res.data);
      set({ recentActivity: res.data, loading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({
          error: error.message || "Failed to fetch recent activity",
          loading: false,
        });
      }
    }
  },
}));
