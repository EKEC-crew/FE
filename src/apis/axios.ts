// src/api/apiClient.ts
import axios from "axios";
import { refreshApi } from "./auth"; // 리프레시 API 함수

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 공개 API (엑세스 토큰 없이도 되는 요청)
export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 포함
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// 🔒 인증이 필요한 요청
export const privateAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 포함
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// Authorization 헤더 주입 필요 없음 (httpOnly 쿠키 기반이라 우리가 접근 불가)

// 응답 인터셉터: 401 발생 시 → refresh 요청 → 재요청 시도
privateAPI.interceptors.response.use(
  (response) => response, // 성공 그대로 통과
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 + 무한루프 방지용 플래그
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 API 요청 (쿠키 기반)
        await refreshApi();

        // 재요청만 해주면 됨 (서버가 새 accessToken을 쿠키에 세팅)
        return privateAPI(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 = 로그인 필요
        window.location.href = "/signIn";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그 외 에러는 그대로 던짐
  }
);
