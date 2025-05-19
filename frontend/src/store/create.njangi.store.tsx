import { create } from "zustand";
import axios from "axios";
import { NjangiSetup } from "../types/create-njangi-types";

const CREATE_NJANGI_API = import.meta.env.VITE_CREATE_NJANGI_API_URL;
console.log(CREATE_NJANGI_API);

axios.defaults.withCredentials = true;

interface CreateNjangiState {
  isLoading: boolean;
  errors: string | null;
  success: boolean;
  createNjangi: (submissionData: NjangiSetup) => Promise<void>;
}

export const useCreateNjangiStore = create<CreateNjangiState>((set) => ({
  isLoading: false,
  errors: null,
  success: false,
  createNjangi: async (submissionData: NjangiSetup) => {
    set({ isLoading: true, errors: null, success: false });
    try {
      const response = await axios.post(`${CREATE_NJANGI_API}`, submissionData);
      set({ isLoading: false, success: response.data.message });
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
}));
