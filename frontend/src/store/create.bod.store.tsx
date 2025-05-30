// store/use.bod.store.ts
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { GroupRequest } from "../types/group.request.ts";
import { post } from "../utils/axiosClient.ts";

interface Report {
  id: string;
  type: string;
  content: string;
  summary?: string;
  status: string;
  title: string;
  uploaded: string;
}

interface Metrics {
  profit: number;
  expenses: number;
  revenue: number;
}

interface BodStoreState {
  requests: GroupRequest[];
  isLoading: boolean;
  error: string | null;
  notifications: {
    isRead: boolean;
    _id: string;
    message: string;
    createdAt: string;
  }[];
  reports: Report[];
  fetchReports: () => Promise<void>;
  createReport: (
    title: string,
    type: string,
    content: string,
    status: string,
    uploaded: string,
    metrics: Metrics,
    summary?: string
  ) => Promise<void>;
  fetchRequests: () => Promise<void>;
  acceptRequest: (id: string, reason: string) => Promise<void>;
  rejectRequest: (id: string, reason: string) => Promise<void>;
}

export const useBodStore = create<BodStoreState>((set) => ({
  requests: [],
  reports: [],
  isLoading: false,
  error: null,
  notifications: [],

  fetchRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bod/drafts`,
        { withCredentials: true }
      );

      console.log(res.data);

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
        `${import.meta.env.VITE_API_URL}/bod/approve`,
        { reason, action: "approve", draftId: id },
        { withCredentials: true }
      );
      set((state) => ({
        requests: state.requests.filter((req) => req._id !== id),
      }));
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  },

  fetchReports: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bod/reports`,
        { withCredentials: true }
      );
      console.log(res.data);
      set({ reports: res.data, isLoading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data });
      }
    }
  },

  createReport: async (
    title: string,
    type: string,
    content: string,
    status: string,
    uploaded: string,
    metrics: Metrics,
    summary?: string
  ) => {
    try {
      const res = await post("/bod/reports", {
        title,
        type,
        content,
        summary,
        status,
        metrics,
        uploaded,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Failed to accept request:", err);
    }
  },

  rejectRequest: async (id: string, reason: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bod/reject`,
        { reason, action: "reject", draftId: id },
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
