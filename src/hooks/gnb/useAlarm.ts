import { privateAPI } from "../../apis/axios";
import type {
  EnhancedAlarm,
  Alarm,
  AlarmResponse,
  MarkAsReadResponse,
} from "../../types/alarm/types";
import { useState, useEffect, useCallback } from "react";

const useAlarm = () => {
  const [alarms, setAlarms] = useState<EnhancedAlarm[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 알람 메시지 생성 함수
  const generateAlarmMessage = useCallback((alarm: Alarm): string => {
    switch (alarm.type) {
      case "CREW_JOIN_REQUEST":
        return `${alarm.user?.nickname}님이 ${alarm.crew?.name} 크루 가입을 요청했습니다.`;

      case "CREW_JOIN_ACCEPTED":
        return `${alarm.crew?.name} 크루 가입이 승인되었습니다.`;

      case "CREW_JOIN_REJECTED":
        return `${alarm.crew?.name} 크루 가입이 거절되었습니다.`;

      case "NOTICE_CREATED":
        return `${alarm.crew?.name} 크루에 새 공지사항이 등록되었습니다.`;

      case "SCHEDULE_CREATED":
        return `${alarm.crew?.name} 크루에 새로운 일정이 생성되었습니다.`;

      case "POST_LIKED":
        return `${alarm.user?.nickname}님이 내 게시글을 좋아요 했습니다.`;

      case "POST_COMMENTED":
        return `${alarm.user?.nickname}님이 내 게시글에 댓글을 남겼습니다.`;

      case "CREW_WARNED":
        return `${alarm.crew?.name} 크루에서 경고를 받았습니다.`;

      case "CREW_KICKED":
        return `${alarm.crew?.name} 크루에서 추방되었습니다.`;

      default:
        return "새로운 알림이 있습니다.";
    }
  }, []);

  // 상대적 시간 표시 함수
  const getRelativeTime = useCallback((createdAt: string): string => {
    const now = new Date();
    const alarmTime = new Date(createdAt);
    const diffInMs = now.getTime() - alarmTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 7) return `${diffInDays}일 전`;

    return alarmTime.toLocaleDateString();
  }, []);

  // 알람 목록 조회 - 읽지 않은 알람만 필터링
  const fetchAlarms = useCallback(
    async (page: number = 1, append: boolean = false): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await privateAPI.get<AlarmResponse>(
          `alarm/list?page=${page}`
        );
        const result = response.data;

        if (result.resultType === "SUCCESS") {
          const alarmsWithMessages: EnhancedAlarm[] = result.data.alarms
            .filter((alarm) => !alarm.isRead) // ✨ 읽지 않은 알람만 필터링
            .map((alarm: Alarm) => ({
              ...alarm,
              message: generateAlarmMessage(alarm),
              relativeTime: getRelativeTime(alarm.createdAt),
              isRead: alarm.isRead || false,
            }));

          if (append) {
            setAlarms((prev) => [...prev, ...alarmsWithMessages]);
          } else {
            setAlarms(alarmsWithMessages);
          }

          setTotalCount(result.data.count);
          setUnreadCount(alarmsWithMessages.length);
          setCurrentPage(page);
        } else {
          setError(result.error || "알람을 불러오는데 실패했습니다.");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("로그인이 필요합니다.");
        } else {
          setError("네트워크 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    },
    [generateAlarmMessage, getRelativeTime]
  );

  // 더 많은 알람 로드
  const loadMoreAlarms = useCallback((): void => {
    fetchAlarms(currentPage + 1, true);
  }, [fetchAlarms, currentPage]);

  // ✨ 알람 타입에 따른 적절한 페이지 경로 생성
  const getCrewPagePath = useCallback((alarm: EnhancedAlarm): string => {
    const crewId = alarm.crew?.id;

    switch (alarm.type) {
      case "CREW_JOIN_REQUEST":
        // 크루 가입 요청 → 지원자 확인 페이지
        return `/crew/${crewId}/applicants`;

      case "CREW_JOIN_ACCEPTED":
      case "CREW_JOIN_REJECTED":
        // 크루 가입 승인/거절 → 크루 메인 페이지
        return `/crew/${crewId}`;

      case "NOTICE_CREATED":
        // 공지사항 생성 → 특정 공지사항 페이지
        if (alarm.noticeId) {
          return `/crew/${crewId}/notice/${alarm.noticeId}`;
        }
        return `/crew/${crewId}/notice`;

      case "SCHEDULE_CREATED":
        // 일정 생성 → 특정 일정 페이지
        if (alarm.planId) {
          return `/crew/${crewId}/schedule/${alarm.planId}`;
        }
        return `/crew/${crewId}/schedule`;

      case "POST_LIKED":
      case "POST_COMMENTED":
        // 게시글 좋아요/댓글 → 특정 게시글 페이지
        if (alarm.postId) {
          return `/crew/${crewId}/post/${alarm.postId}`;
        }
        return `/crew/${crewId}/board`;

      case "CREW_WARNED":
      case "CREW_KICKED":
        // 크루 경고/추방 → 크루 메인 페이지
        return `/crew/${crewId}`;

      default:
        // 기본값 → 크루 메인 페이지
        return `/crew/${crewId}`;
    }
  }, []);

  // 알람 읽음 처리 - 읽은 알람은 목록에서 제거
  const markAsRead = useCallback(async (alarmId: number): Promise<void> => {
    try {
      const response = await privateAPI.patch<MarkAsReadResponse>(
        `/alarm/${alarmId}`
      );

      if (response.data.resultType === "SUCCESS") {
        console.log("알람 읽음 처리 성공:", response.data.data?.id);

        // ✨ 읽은 알람은 목록에서 완전히 제거
        setAlarms((prev) => prev.filter((alarm) => alarm.id !== alarmId));

        // 읽지 않은 개수 감소
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } else {
        console.error("알람 읽음 처리 실패:", response.data.error);
      }
    } catch (err: any) {
      console.error("알람 읽음 처리 API 에러:", err);
    }
  }, []);

  // 초기 로드
  useEffect(() => {
    fetchAlarms(1);
  }, [fetchAlarms]);

  return {
    alarms,
    loading,
    error,
    totalCount,
    unreadCount,
    currentPage,
    fetchAlarms,
    loadMoreAlarms,
    getCrewPagePath,
    markAsRead,
    generateAlarmMessage,
    getRelativeTime,
  };
};

export default useAlarm;
