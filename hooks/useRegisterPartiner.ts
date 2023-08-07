import { create } from "zustand";

interface DrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterPartiner = create<DrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterPartiner;
