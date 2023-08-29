import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginStore {
  isLogged: boolean;
  email: string;
  role: string;
  name?: string;
  token: string;
  userData?: any;
  setUserData: (userData: any) => void;
  setRole: (role: string) => void;
  setName: (name: string) => void;
  onLogin: () => void;
  onLogout: () => void;
  setToken: (token: string) => void;
}

const useLogin = create(
  persist<LoginStore>(
    (set) => ({
      token: "",
      isLogged: false,
      email: "",
      role: "",
      name: "",
      userData: [],
      setUserData: (userData) => set({ userData: userData }),
      setName: (name) => set({ name: name }),
      setRole: (role) => set({ role: role }),
      onLogin: () => set({ isLogged: true }),
      onLogout: () => set({ isLogged: false, token: "", name: "", email: "" }),
      setToken: (token) => set({ token: token }),
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLogin;
