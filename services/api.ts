import useLogin from "@/hooks/useLogin";
import axios from "axios";

const auth = useLogin.getState();
let authToken = auth.token;

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  },
});

export default api;
