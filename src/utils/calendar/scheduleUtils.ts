import type { ScheduleItem } from "../../types/detail/schedule/types";

//특정 날짜에 해당하는 일정들을 필터링하는 함수
export const getSchedulesForDate = (
  schedules: ScheduleItem[],
  date: Date
): ScheduleItem[] => {
  return schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.day);
    return (
      scheduleDate.getFullYear() === date.getFullYear() &&
      scheduleDate.getMonth() === date.getMonth() &&
      scheduleDate.getDate() === date.getDate()
    );
  });
};

//툴팁 높이를 계산하는 함수
export const getTooltipHeight = (scheduleCount: number): number => {
  const paddingHeight = 16; // 상하 패딩 (p-2)
  const itemHeight = 32; // 각 항목 높이
  const maxDisplayItems = 3; // 최대 표시 항목 수

  const displayItems = Math.min(scheduleCount, maxDisplayItems);
  return paddingHeight + displayItems * itemHeight;
};

//일정 타입에 따른 색상을 반환하는 함수
export const getScheduleTypeColor = (type: number): string => {
  return type === 0 ? "#375FFF" : "#00C2FF";
};

//일정 타입에 따른 라벨을 반환하는 함수
export const getScheduleTypeLabel = (type: number): string => {
  return type === 0 ? "정기 모임" : "번개 모임";
};
