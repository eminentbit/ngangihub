import { create } from "zustand";

interface TransactionStore {
  transactionId: string | null;
  setTransactionId: (id: string) => void;
  clearTransactionId: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactionId: localStorage.getItem("njangi_transaction_id") || null,
  setTransactionId: (id: string) => {
    localStorage.setItem("njangi_transaction_id", id);
    set({ transactionId: id });
  },
  clearTransactionId: () => {
    localStorage.removeItem("njangi_transaction_id");
    set({ transactionId: null });
  },
}));
