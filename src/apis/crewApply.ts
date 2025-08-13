// src/apis/apply.ts
import type {
  ApiResponse,
  ApiSuccess,
  ApplicantsDTO,
  ApplyRequestBody,
} from "../types/apply/types";
import { privateAPI } from "./axios";

export const getApplyInit = async (crewId: number): Promise<ApiSuccess> => {
  const res = await privateAPI.get<ApiResponse>(`/crew/${crewId}/apply`);
  if (res.data.resultType !== "SUCCESS") {
    throw new Error(res.data.error ?? "질문/조건 조회 실패");
  }
  return res.data.success; // { step1, step2, recruitMessage }
};

//지원하기
export const postApply = (crewId: number, body: ApplyRequestBody) =>
  privateAPI.post(`/crew/${crewId}/apply`, body).then((res) => res.data);

//지원자 목록 가져오기
export async function getApplicants(crewId: number) {
  const res = await privateAPI.get<ApplicantsDTO>(
    `/crew/${crewId}/apply/applicants`
  );
  return res.data;
}

//특정 크루 특정 지원서 가져오기
export const getApplyDetail = async (crewId: number, applyId: number) => {
  const { data } = await privateAPI.get(`/crew/${crewId}/apply/${applyId}`);
  return data?.success ?? data;
};
