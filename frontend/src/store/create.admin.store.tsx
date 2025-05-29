import { create } from "zustand";

interface Member {
  id: number;
  initials: string;
  name: string;
  role: string;
  status: "active" | "inactive";
}

export const useAdminState = create((set) => ({
  groupId: null,
  setGroupId: (id: string) => set({ groupId: id }),

  selectedMember: null,
  selectMember: (member: Member) => set({ selectedMember: member }),

  isEditingSettings: false,
  toggleEditSettings: () =>
    set((state: { isEditingSettings: boolean }) => ({
      isEditingSettings: !state.isEditingSettings,
    })),
}));
