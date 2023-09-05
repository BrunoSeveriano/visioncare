import { create } from "zustand";

interface OnboardModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOnboardModalPartiner = create<OnboardModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOnboardModalPartiner;
