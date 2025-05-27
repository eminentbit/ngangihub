import { create } from "zustand";
import axios from "axios";

const ACCEPT_INVITE_API = import.meta.env.VITE_ACCEPT_INVITE_MEMBER_API_URL;

interface AcceptInviteState {
  isLoading: boolean;
  isErrors: string | null;
  success: boolean;
  acceptInvite: (inviteToken: string, memberInfo: MemberInfo) => Promise<void>;
}

interface MemberInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const useAcceptInviteStore = create<AcceptInviteState>((set) => ({
  isLoading: false,
  isErrors: null,
  success: false,

  acceptInvite: async (inviteToken: string, memberInfo: MemberInfo) => {
    set({ isLoading: true, isErrors: null, success: false });
    try {
      const response = await axios.post(
        `${ACCEPT_INVITE_API}?token=${inviteToken}`,
        memberInfo
      );
      set({ isLoading: false, success: true, isErrors: null });
      console.log(response.data);
    } catch (isErrors) {
      set({
        isLoading: false,
        isErrors:
          axios.isAxiosError(isErrors) && isErrors.response?.data?.message
            ? isErrors.response.data.message
            : "An isErrors occurred while accepting your invite! Please try again.",
      });
    }
  },
}));
