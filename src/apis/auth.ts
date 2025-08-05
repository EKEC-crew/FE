import axios from "axios";
import type {
  RequestCreateProfile,
  RequestSign,
  ResponseCreateProfile,
  ResponseRefresh,
  ResponseSign,
} from "../types/auth/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Auth 관련 axios 인스턴스
export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// 요청 인터셉터 (필요시 토큰 추가 등)
authApi.interceptors.request.use(
  (config) => {
    // 토큰이 필요한 경우 여기서 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 공통 에러 처리
    if (error.response?.status === 401) {
      // 인증 오류 처리
      console.error("인증 오류:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// 회원가입 API 함수
export const signUpApi = async (data: RequestSign): Promise<ResponseSign> => {
  const response = await authApi.post<ResponseSign>("/auth/signup", data);
  return response.data;
};

// 로그인 API 함수
export const loginApi = async (data: RequestSign): Promise<ResponseSign> => {
  const response = await authApi.post<ResponseSign>("/auth/login", data);
  return response.data;
};

// 토큰 갱신 API 함수
export const refreshApi = async (): Promise<ResponseRefresh> => {
  const response = await authApi.post<ResponseRefresh>("/auth/refresh");
  return response.data;
};

// 프로필 생성 API 함수
export const createProfileApi = async (
  data: RequestCreateProfile
): Promise<ResponseCreateProfile> => {
  const response = await authApi.post<ResponseCreateProfile>(
    "/auth/profile",
    data
  );
  return response.data;
};
