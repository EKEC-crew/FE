// src/apis/apply.ts
import type {
  ApiResponse,
  ApiSuccess,
  ApplicantsDTO,
  AppliedListResponse,
  AppliedListSuccess,
  ApplyRequestBody,
} from "../types/apply/types";
import { privateAPI } from "./axios";

//승인 거부 props
export interface ApprovalRequest {
  status: number; // 1: 승인, 0: 거부
}

export interface ApprovalResponse {
  resultType: "SUCCESS" | "ERROR";
  error: any;
  success: {
    message: string;
    updated: {
      count: number;
    };
  };
}

export const getApplyInit = async (crewId: number): Promise<ApiSuccess> => {
  const res = await privateAPI.get<ApiResponse>(`/crew/apply/${crewId}/apply`);
  if (res.data.resultType !== "SUCCESS") {
    throw new Error(res.data.error ?? "질문/조건 조회 실패");
  }
  return res.data.success; // { step1, step2, recruitMessage }
};

//지원하기
export const postApply = (crewId: number, body: ApplyRequestBody) =>
  privateAPI.post(`/crew/apply/${crewId}/apply`, body).then((res) => res.data);

//지원자 목록 가져오기
export async function getApplicants(crewId: number) {
  const res = await privateAPI.get<ApplicantsDTO>(
    `/crew/apply/${crewId}/apply/applicants`
  );
  return res.data;
}

//특정 크루 특정 지원서 가져오기
export const getApplyDetail = async (crewId: number, applyId: number) => {
  const { data } = await privateAPI.get(
    `/crew/apply/${crewId}/apply/${applyId}`
  );
  return data?.success ?? data;
};

export const crewApplyAPI = {
  // 승인/거부 API
  updateApplyStatus: async (
    crewId: number,
    applyId: number,
    data: ApprovalRequest
  ): Promise<ApprovalResponse> => {
    try {
      console.log("📤 요청:", {
        url: `/crew/apply/${crewId}/apply/${applyId}`,
        data,
      });
      const response = await privateAPI.patch(
        `/crew/apply/${crewId}/apply/${applyId}`,
        data
      );
      console.log("📥 응답:", response.data);
      return response.data;
    } catch (error: any) {
      console.log("❌ 에러 상세:", error.response?.data);

      // 서버에서 FAIL 응답이 온 경우 (비즈니스 로직 에러)
      // 그냥 원본 에러를 그대로 던지기
      if (error.response?.data?.resultType === "FAIL") {
        const serverError = error.response.data.error;
        const errorMessage =
          serverError?.reason || "처리 중 오류가 발생했습니다.";

        // 원본 에러의 message만 바꾸기
        error.message = errorMessage;
        throw error;
      }

      // 그 외의 네트워크 에러나 다른 에러들
      throw error;
    }
  },

  // 승인 API (편의 함수)
  approve: (crewId: number, applyId: number) =>
    crewApplyAPI.updateApplyStatus(crewId, applyId, { status: 1 }),

  // 거부 API (편의 함수)
  reject: (crewId: number, applyId: number) =>
    crewApplyAPI.updateApplyStatus(crewId, applyId, { status: 0 }),
};

// 크루 정보 응답 타입 정의
export interface CrewInfoResponse {
  resultType: "SUCCESS" | "FAIL";
  error: string | null;
  data: {
    crewId: number;
    title: string;
    content: string;
    score: number;
    memberCount: number;
    crewCapacity: number;
    bannerImage: string | null;
    nickname: string;
    profileImage: string | null;
    category: string;
    introduction: string;
  } | null;
}
// 크루정보 조회 api
export const getCrewInfo = async (
  crewId: number
): Promise<CrewInfoResponse> => {
  try {
    const response = await privateAPI.get<CrewInfoResponse>(
      `/crew/${crewId}/info/`
    );
    return response.data;
  } catch (error) {
    console.error("크루 정보 조회 실패:", error);
    throw error;
  }
};

// 내가 지원한 크루 조회 apis
export type GetAppliedListParams = {
  page?: number; // 1-base 또는 0-base는 백엔드 규약에 맞춰 조정
  size?: number;
};

export async function getAppliedCrewList(
  params?: GetAppliedListParams
): Promise<AppliedListSuccess> {
  const res = await privateAPI.get<AppliedListResponse>("/crew/apply/list", {
    params,
  });
  // 서버 응답 포맷: { resultType, error, success }
  if (res.data.resultType !== "SUCCESS" || !res.data.success) {
    const msg = (res.data as any)?.error?.reason ?? "지원 내역 조회 실패";
    throw new Error(msg);
  }
  return res.data.success;
}
