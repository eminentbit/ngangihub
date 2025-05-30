import { create } from "zustand";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GroupDetails } from "../types/create-njangi-types";
import { secureGet } from "../utils/axiosClient";

interface Notification {
  isRead: boolean;
  _id: string;
  message: string;
  createdAt: string;
}

interface UserState {
  groups: GroupDetails[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  setGroups: (groups: GroupDetails[]) => void;
  fetchNotifications: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  groups: [],
  notifications: [],
  isLoading: false,
  error: null,

  setGroups: (groups) => set({ groups }),

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await secureGet(`/notifications/user`);
      set({
        notifications: res.data,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      set({ error: "Could not fetch notifications", isLoading: false });
    }
  },
}));

export const useGroupsQuery = () => {
  const setGroups = useUserStore((state) => state.setGroups);
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await secureGet(`/groups`);
      setGroups(res.data); // Sync Zustand store
      return res.data;
    },
  });
};

export default useUserStore;
