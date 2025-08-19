import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 통합 API 인스턴스
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// 호환성을 위한 별칭
export const privateAPI = API;
