import { create } from "zustand";
import { securePost, secureGet } from "../utils/axiosClient";
import { AxiosError } from "axios";

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

  fetchSubmissionStats: () => Promise<void>;

  // Setters
  setGroupId: (id: string) => void;
  setMembers: (members: Member[]) => void;
  selectMember: (member: Member) => void;
  toggleEditSettings: () => void;

  // CRUD actions
  fetchMembers: () => Promise<void>;
  fetchGroups: () => Promise<void>;
  fetchGroupInfo: (groupId: string) => Promise<void>;
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

  fetchGroupInfo: async (groupId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await secureGet(`/admin/group/${groupId}`, {
        silent: true,
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
      console.log("Fetched submission stats:", response.data);
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
}));
