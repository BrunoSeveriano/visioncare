import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCancelVoucher = create<DrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCancelVoucher;
