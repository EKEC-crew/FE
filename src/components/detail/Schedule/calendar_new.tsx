import React, { useState } from "react";
import Calendar from "react-calendar";
import type { ScheduleItem } from "../../../types/detail/schedule/types";
import { useCalendarTooltip } from "../../../hooks/calendar";
import { useCalendarStyles } from "../../../styles/calendar";
import { getSchedulesForDate, getTooltipHeight } from "../../../utils/calendar";
import CalendarLegend from "./calendar/CalendarLegend";
import CalendarTileContent from "./calendar/CalendarTileContent";
import CalendarTooltip from "./calendar/CalendarTooltip";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CrewCalendarProps {
  schedules?: ScheduleItem[];
}

const CrewCalendar: React.FC<CrewCalendarProps> = ({ schedules = [] }) => {
  const [value, setValue] = useState<Value>(new Date());

  // 커스텀 훅들
  const { selectedDate, tooltipPosition, showTooltip, hideTooltip } =
    useCalendarTooltip();
  useCalendarStyles();

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date, event: React.MouseEvent) => {
    const daySchedules = getSchedulesForDate(schedules, date);

    if (daySchedules.length > 0) {
      const target = event.currentTarget as HTMLElement;
      const calendarWrapper = target.closest(
        ".calendar-wrapper"
      ) as HTMLElement;
      const targetRect = target.getBoundingClientRect();
      const wrapperRect = calendarWrapper.getBoundingClientRect();

      // 동적 높이 계산
      const tooltipHeight = getTooltipHeight(daySchedules.length);
      const relativeY = targetRect.top - wrapperRect.top;

      showTooltip(date, {
        x: targetRect.left - wrapperRect.left + targetRect.width / 2,
        y: relativeY - 10,
        height: tooltipHeight,
      });
    } else {
      hideTooltip();
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    return (
      <CalendarTileContent date={date} view={view} schedules={schedules} />
    );
  };

  return (
    <div className="calendar-wrapper relative">
      <CalendarLegend />

      <Calendar
        onChange={(nextValue) => setValue(nextValue)}
        value={value}
        calendarType="gregory"
        tileContent={tileContent}
        onClickDay={(date, event) => handleDateClick(date, event)}
        locale="ko-US"
        formatDay={(_locale, date) => String(date.getDate())}
        formatMonthYear={(_locale, date) =>
          date.toLocaleString("en-US", { month: "long" })
        }
      />

      <CalendarTooltip
        selectedDate={selectedDate}
        tooltipPosition={tooltipPosition}
        schedules={
          selectedDate ? getSchedulesForDate(schedules, selectedDate) : []
        }
        onClose={hideTooltip}
      />
    </div>
  );
};

export default CrewCalendar;
