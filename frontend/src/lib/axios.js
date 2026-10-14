import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:2000/api" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default api;
