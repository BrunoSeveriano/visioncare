import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginStore {
  isLogged: boolean;
  email: string;
  role: string;
  name?: string;
  token: string;
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
      isLogged: true,
      email: "",
      role: "",
      name: "",
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
