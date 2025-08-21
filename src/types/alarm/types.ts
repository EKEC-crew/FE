// 알람 타입 열거형
export type AlarmType =
  | "CREW_JOIN_REQUEST"
  | "CREW_JOIN_ACCEPTED"
  | "CREW_JOIN_REJECTED"
  | "NOTICE_CREATED"
  | "SCHEDULE_CREATED"
  | "POST_LIKED"
  | "POST_COMMENTED"
  | "CREW_WARNED"
  | "CREW_KICKED";

// 사용자 정보 타입
export interface AlarmUser {
  id: number;
  nickname: string;
  name: string;
}

// 크루 정보 타입
export interface AlarmCrew {
  id: number;
  name: string;
}

// 알람 객체 타입
export interface Alarm {
  id: number;
  type: AlarmType;
  createdAt: string;
  noticeId: number | null;
  postId: number | null;
  planId: number | null;
  user: AlarmUser | null;
  crew: AlarmCrew;
  isRead?: boolean; // 읽음 상태
}

// 메시지와 시간이 추가된 알람 타입
export interface EnhancedAlarm extends Alarm {
  message: string;
  relativeTime: string;
  isRead: boolean; // 필수로 변경
}

// API 응답 타입
export interface AlarmResponse {
  resultType: "SUCCESS" | "ERROR";
  error: string | null;
  data: {
    alarms: Alarm[];
    count: number;
  };
}

// 읽음 처리 API 응답 타입
export interface MarkAsReadResponse {
  resultType: "SUCCESS" | "ERROR";
  error: string | null;
  data: {
    id: number;
  } | null;
}
