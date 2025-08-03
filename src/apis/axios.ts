// src/api/apiClient.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // .env 값 그대로 사용

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
