import useLogin from "@/hooks/useLogin";
import axios from "axios";

const auth = useLogin.getState();
let authToken = auth.token;

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
    "Access-Control-Allow-Origin": "*",

    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
});

export default api;
