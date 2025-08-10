// src/apis/apply.ts
import type { ApiResponse, ApiSuccess } from "../types/apply/types";
import { privateAPI } from "./axios";

export const getApplyInit = async (crewId: number): Promise<ApiSuccess> => {
  const res = await privateAPI.get<ApiResponse>(`/crew/${crewId}/apply`);
  if (res.data.resultType !== "SUCCESS") {
    throw new Error(res.data.error ?? "질문/조건 조회 실패");
  }
  return res.data.success; // { step1, step2, recruitMessage }
};
