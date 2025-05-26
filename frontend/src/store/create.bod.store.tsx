// store/use.bod.store.ts
import { create } from "zustand";
import axios from "axios";
import { GroupRequest } from "../types/group.request.ts";

interface BodStoreState {
  requests: GroupRequest[];
  isLoading: boolean;
  error: string | null;

  fetchRequests: () => Promise<void>;
  acceptRequest: (id: string, reason: string) => Promise<void>;
  rejectRequest: (id: string, reason: string) => Promise<void>;
}

export const useBodStore = create<BodStoreState>((set) => ({
  requests: [],
  isLoading: false,
  error: null,

  fetchRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bod/drafts`,
        { withCredentials: true }
      );

      set({
        requests: res.data.data,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch requests:", err);
      set({ error: "Could not fetch requests", isLoading: false });
    }
  },

  acceptRequest: async (id: string, reason: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/najngi/requests/${id}/accept`,
        { reason, action: "accept" },
        { withCredentials: true }
      );
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  },

  rejectRequest: async (id: string, reason: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/najngi/requests/${id}/accept`,
        { reason, action: "reject" },
        { withCredentials: true }
      );
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));
    } catch (err) {
      console.error("Failed to reject request:", err);
    }
  },
}));
