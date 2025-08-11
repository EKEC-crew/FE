import { privateAPI } from "./axios";
import type {
  RequestCreateSchedule,
  ResponseCreateSchedule,
  ResponseScheduleList,
  ResponseScheduleDetail,
  RequestUpdateSchedule,
  ResponseUpdateSchedule,
  ResponseDeleteSchedule,
} from "../types/detail/schedule/types";

// 일정 등록 API 함수
export const createScheduleApi = async (
  crewId: string,
  data: RequestCreateSchedule
): Promise<ResponseCreateSchedule> => {
  const response = await privateAPI.post<ResponseCreateSchedule>(
    `/crew/${crewId}/plan/`,
    data
  );
  console.log("[createScheduleApi] response.data:", response.data);
  return response.data;
};

// 일정 목록 조회 API 함수
export const getScheduleListApi = async (
  crewId: string,
  page: number = 1,
  size: number = 10
): Promise<ResponseScheduleList> => {
  console.log(
    `[getScheduleListApi] Requesting: /crew/${crewId}/plan/list?page=${page}&size=${size}`
  );
  const response = await privateAPI.get<ResponseScheduleList>(
    `/crew/${crewId}/plan/list?page=${page}&size=${size}`
  );
  console.log("[getScheduleListApi] response.data:", response.data);
  return response.data;
};

// 일정 세부 조회 API 함수
export const getScheduleDetailApi = async (
  crewId: string,
  planId: string
): Promise<ResponseScheduleDetail> => {
  console.log(
    `[getScheduleDetailApi] Requesting: /crew/${crewId}/plan/${planId}`
  );
  const response = await privateAPI.get<ResponseScheduleDetail>(
    `/crew/${crewId}/plan/${planId}`
  );
  console.log("[getScheduleDetailApi] response.data:", response.data);
  return response.data;
};

// 일정 수정 API 함수
export const updateScheduleApi = async (
  crewId: string,
  planId: string,
  data: RequestUpdateSchedule
): Promise<ResponseUpdateSchedule> => {
  console.log(`[updateScheduleApi] Requesting: /crew/${crewId}/plan/${planId}`);
  const response = await privateAPI.put<ResponseUpdateSchedule>(
    `/crew/${crewId}/plan/${planId}`,
    data
  );
  console.log("[updateScheduleApi] response.data:", response.data);
  return response.data;
};

// 일정 삭제 API 함수
export const deleteScheduleApi = async (
  crewId: string,
  planId: string
): Promise<ResponseDeleteSchedule> => {
  console.log(
    `[deleteScheduleApi] Requesting: DELETE /crew/${crewId}/plan/${planId}`
  );
  const response = await privateAPI.delete<ResponseDeleteSchedule>(
    `/crew/${crewId}/plan/${planId}`
  );
  console.log("[deleteScheduleApi] response.data:", response.data);
  return response.data;
};
