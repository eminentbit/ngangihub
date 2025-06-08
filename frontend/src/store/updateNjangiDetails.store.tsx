/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { securePut } from "../utils/axiosClient";

type UpdateNjangiResponse = {
  sucess: boolean;
  message: string;
};

interface UpdateNjangiState {
  loading: boolean;
  error: string | null;
  success: boolean;
  updateNjangi: (
    id: string | null,
    updateData: Record<string, any>
  ) => Promise<UpdateNjangiResponse>;
  reset: () => void;
}

export const useUpdateNjangiStore = create<UpdateNjangiState>((set) => ({
  loading: false,
  error: null,
  success: false,
  updateNjangi: async (id, updateData) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await securePut(
        `${import.meta.env.VITE_UPDATE_STATE_DASHBOARD_NJANGI}?draftId=${id}`,
        updateData
      );
      set({ loading: false, success: true });
      return response.data;
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message || "Update failed",
        success: false,
      });
      return {
        sucess: false,
        message: err.response?.data?.message || err.message || "Update failed",
      };
    }
  },
  reset: () => set({ loading: false, error: null, success: false }),
}));
