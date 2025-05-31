import { create } from "zustand";
import { securePost } from "../utils/axiosClient";

interface Member {
  id: number;
  initials: string;
  name: string;
  role: string;
  status: "active" | "inactive";
}

export const useAdminState = create((set) => ({
  groupId: null,
  members: [],
  setGroupId: (id: string) => set({ groupId: id }),

  selectedMember: null,
  selectMember: (member: Member) => set({ selectedMember: member }),
  addMember: async (member: Member) => {
    await securePost("/admin/add-member", {});

    set((state: { members: Member[] }) => ({
      members: state.members.push(member),
    }));
  },
  isEditingSettings: false,
  toggleEditSettings: () =>
    set((state: { isEditingSettings: boolean }) => ({
      isEditingSettings: !state.isEditingSettings,
    })),
}));
