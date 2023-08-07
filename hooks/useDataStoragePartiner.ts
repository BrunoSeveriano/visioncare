import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DataStore {
  partnerData: any;
  setPartiner: (partiners: any) => void;
}

const useDataStoragePartiner = create(
  persist<DataStore>(
    (set) => ({
      partnerData: [],

      setPartiner: (partiners) => {
        set({
          partnerData: partiners,
        });
      },
    }),
    {
      name: "data-storage-partiner",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDataStoragePartiner;
