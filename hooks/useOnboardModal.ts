import { create } from "zustand";

interface OnboardModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useOnboardModal = create<OnboardModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOnboardModal;
