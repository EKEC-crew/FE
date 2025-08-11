// 일정 타입 (0: 정기, 1: 특별)
export type ScheduleType = 0 | 1;

// 일정 등록 요청 타입
export interface RequestCreateSchedule {
  title: string;
  content: string;
  day: string; // ISO 8601 format
  type: ScheduleType;
  isRequired: boolean;
  allowComments: boolean;
  allowPrivateComments: boolean;
  allowExternalShare: boolean;
  hasFee: boolean;
  fee: number;
  feePurpose: string;
}

// 일정 등록 응답 데이터 타입
export interface ScheduleData {
  id: number;
  crew_name: string;
  writer: string;
  title: string;
  content: string;
  day: string; // ISO 8601 format
  type: ScheduleType;
  isRequired: boolean;
  allowComments: boolean;
  allowPrivateComments: boolean;
  allowExternalShare: boolean;
  hasFee: boolean;
  fee: number;
  feePurpose: string;
  createdAt: string; // ISO 8601 format
}

// 일정 등록 응답 타입
export interface ResponseCreateSchedule {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: any;
  };
  data: ScheduleData | null;
}

// 실제 API 응답에 맞는 일정 아이템 타입
export interface ScheduleItem {
  id: number;
  crew_name: string;
  writer: string;
  day: string;
  title: string;
  content: string;
  type: ScheduleType;
  allowComments: boolean;
  allowPrivateComments: boolean;
  allowExternalShare: boolean;
  hasFee: boolean;
  fee: number;
  feePurpose: string;
  isRequired: boolean;
  createdAt: string;
  updatedAt: string | null;
  userId: number;
}

export interface PaginationInfo {
  totalElements: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ScheduleListData {
  plans: ScheduleItem[];
  pagination: PaginationInfo;
}

// 일정 목록 조회 응답 타입 (실제 API 형식)
export interface ResponseScheduleList {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: any;
  };
  data: ScheduleListData;
}

// 일정 세부 조회 응답 타입 (실제 API 형식)
export interface ResponseScheduleDetail {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: any;
  };
  data: ScheduleItem;
}

// 일정 수정 요청 타입
export type RequestUpdateSchedule = RequestCreateSchedule;

// 일정 수정 응답 타입
export interface ResponseUpdateSchedule {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: any;
  };
  success: ScheduleItem | null;
}

// 일정 삭제 응답 타입
export interface ResponseDeleteSchedule {
  resultType: "SUCCESS" | "FAIL";
  error: null | {
    errorCode: string;
    reason: string;
    data: any;
  };
  data: null;
}
