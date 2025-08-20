import axios from "axios";
import { refreshApi } from "./auth";
import { useAuthStore } from "../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401이 아니거나 이미 재시도한 요청이면 그대로 에러 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      console.log("🔴 [apiClient] 인터셉터 패스:", {
        status: error.response?.status,
        retry: originalRequest._retry,
      });
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // 토큰 갱신 시도
      await refreshApi();
      // 성공하면 원래 요청 재시도
      return apiClient(originalRequest);
    } catch (refreshError) {
      // 토큰 갱신 실패 - store의 handleAuthError 사용
      const store = useAuthStore.getState();
      store.handleAuthError(refreshError, true); // isFromApiCall = true

      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
