import React from "react";
import type { ScheduleItem } from "../../../../types/detail/schedule/types";
import {
  getSchedulesForDate,
  getScheduleTypeColor,
} from "../../../../utils/calendar";

interface CalendarTileContentProps {
  date: Date;
  view: string;
  schedules: ScheduleItem[];
}

const CalendarTileContent: React.FC<CalendarTileContentProps> = ({
  date,
  view,
  schedules,
}) => {
  if (view !== "month") return null;

  // 날짜별 일정 필터링
  const daySchedules = getSchedulesForDate(schedules, date);

  if (daySchedules.length === 0) return null;

  // 정기, 번개 있는지 확인
  const hasRegular = daySchedules.some((schedule) => schedule.type === 0);
  const hasLightning = daySchedules.some((schedule) => schedule.type === 1);

  return (
    <div className="flex justify-center gap-1 mt-1">
      {hasRegular && (
        <div
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: getScheduleTypeColor(0),
            borderRadius: "50%",
          }}
        />
      )}
      {hasLightning && (
        <div
          style={{
            width: "6px",
            height: "6px",
            backgroundColor: getScheduleTypeColor(1),
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default CalendarTileContent;
