import axios from "axios";
import type {
  RequestCreateProfile,
  RequestSign,
  ResponseCreateProfile,
  ResponseRefresh,
  ResponseSign,
  ResponseSignOut,
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

// 요청 인터셉터
authApi.interceptors.request.use(
  (config) => {
    console.log("→ 요청 URL:", config.url);
    console.log("→ Request Headers:", config.headers);
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
export const signInApi = async (data: RequestSign): Promise<ResponseSign> => {
  const response = await authApi.post<ResponseSign>("/auth/login", data);
  console.log("[signInApi] response.data:", response.data);
  return response.data;
};

// 로그아웃 API 함수
export const signOutApi = async (): Promise<ResponseSignOut> => {
  const response = await authApi.post<ResponseSignOut>("/auth/logout");
  return response.data;
};

// 토큰 갱신 API 함수
export const refreshApi = async (): Promise<ResponseRefresh> => {
  const response = await authApi.post<ResponseRefresh>("/auth/refresh");
  console.log("[refreshApi] response.data:", response.data);
  return response.data;
};

// 프로필 생성 API 함수
export const createProfileApi = async (
  data: RequestCreateProfile
): Promise<ResponseCreateProfile> => {
  const form = new FormData();
  // 파일이 있을 때만 전송
  if (data.profileImage) {
    form.append("profileImage", data.profileImage);
  }
  form.append("defaultImage", String(data.defaultImage));
  form.append("name", data.name);
  form.append("nickname", data.nickname);
  form.append("gender", String(data.gender));
  form.append("phone", data.phone);
  // 생년월일만 JSON 문자열로
  form.append("birthday", JSON.stringify(data.birthday));

  const response = await authApi.post<ResponseCreateProfile>(
    "/auth/profile",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
