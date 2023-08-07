import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ClientDataStore {
  cpf: string;
  email: string;
  name: string;
  birthdate: string;
  mobilephone: string;

  setClientData: (clientData: ClientDataStore) => void;
}

const useClientData = create(
  persist<ClientDataStore>(
    (set) => ({
      cpf: "",
      email: "",
      name: "",
      birthdate: "",
      mobilephone: "",
      setClientData: (clientData) => set({ ...clientData }),
    }),
    {
      name: "client-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useClientData;
