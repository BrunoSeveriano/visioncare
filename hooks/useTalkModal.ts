import { create } from "zustand";

interface TalkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTalkModal = create<TalkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTalkModal;
