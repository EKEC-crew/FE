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

    console.log(
      "🔴 [apiClient] 인터셉터 작동:",
      error.response?.status,
      originalRequest.url
    );

    // 401이 아니거나 이미 재시도한 요청이면 그대로 에러 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      console.log("🔴 [apiClient] 인터셉터 패스:", {
        status: error.response?.status,
        retry: originalRequest._retry,
      });
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    console.log("🔄 [apiClient] refreshApi 시도");

    try {
      // 토큰 갱신 시도
      await refreshApi();
      console.log("✅ [apiClient] refreshApi 성공 - 원래 요청 재시도");
      // 성공하면 원래 요청 재시도
      return apiClient(originalRequest);
    } catch (refreshError) {
      console.log("❌ [apiClient] refreshApi 실패 - handleAuthError 호출");
      // 토큰 갱신 실패 - store의 handleAuthError 사용
      const store = useAuthStore.getState();
      store.handleAuthError(refreshError, true); // isFromApiCall = true

      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
