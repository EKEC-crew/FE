// src/api/apiClient.ts
import axios from "axios";
import { refreshApi } from "./auth";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 공개 API
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// 🔒 인증이 필요한 요청
export const privateAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// 응답 인터셉터
privateAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("🔥 인터셉터 에러 발생:", error.response?.status);

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔥 401 에러 감지!");
      originalRequest._retry = true;

      try {
        await refreshApi();
        console.log("🔥 refresh 성공");
        return privateAPI(originalRequest);
      } catch (refreshError) {
        console.log("🔥 refresh 실패, 홈으로 이동 + URL 파라미터");

        // ✅ URL 파라미터로 모달 표시 신호
        window.location.href = "/?needLogin=true";

        useAuthStore.getState().forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
