import { create } from "zustand";
import axios from "axios";
import { NjangiSetup } from "../types/create-njangi-types";
import { post } from "../utils/axiosClient";

const CREATE_NJANGI_API = import.meta.env.VITE_CREATE_NJANGI_API_URL;

// axios.defaults.withCredentials = true;

interface CreateNjangiState {
  isLoading: boolean;
  errors: string | null;
  success: boolean;
  createdNjangiId: string | null; //Didnot really use it
  njangiStatusURL: string | null;
  draftId: string | null;
  message: string | null;
  createNjangi: (submissionData: NjangiSetup) => Promise<void>;
  clearDraftId: () => void;
}

export const useCreateNjangiStore = create<CreateNjangiState>((set) => ({
  isLoading: false,
  errors: null,
  success: false,
  createdNjangiId: null,
  njangiStatusURL: null,
  draftId: localStorage.getItem("draftId"),
  message: null,
  createNjangi: async (submissionData: NjangiSetup) => {
    set({ isLoading: true, errors: null, success: false });
    localStorage.setItem("tempAdminEmail", submissionData.accountSetup.email);
    try {
      const data = await post(`${CREATE_NJANGI_API}`, submissionData);

      // persist draftId to localStorage
      const draftId = data.draftId;
      if (draftId) {
        localStorage.setItem("draftId", draftId);
      }
      set({
        isLoading: false,
        success: true,
        createdNjangiId: data.njangiId,
        draftId,
        njangiStatusURL: data.njangiURL,
        message: data.message,
      });
    } catch (errors) {
      set({
        isLoading: false,
        errors:
          axios.isAxiosError(errors) && errors.response?.data?.message
            ? errors.response.data.message
            : "An errors occurred while creating your Njangi Please try again.",
      });
    }
  },
  clearDraftId: () => {
    localStorage.removeItem("draftId");
    set({ draftId: null });
  },
}));
