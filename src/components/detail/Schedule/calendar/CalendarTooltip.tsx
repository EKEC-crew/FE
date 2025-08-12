import React from "react";
import type { ScheduleItem } from "../../../../types/detail/schedule/types";
import { getScheduleTypeColor } from "../../../../utils/calendar";

interface CalendarTooltipProps {
  selectedDate: Date | null;
  tooltipPosition: {
    x: number;
    y: number;
    height: number;
  } | null;
  schedules: ScheduleItem[];
  onClose: () => void;
}

const CalendarTooltip: React.FC<CalendarTooltipProps> = ({
  selectedDate,
  tooltipPosition,
  schedules,
  onClose,
}) => {
  if (!tooltipPosition || !selectedDate) return null;

  return (
    <>
      {/* 배경 클릭시 툴팁 닫기 */}
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div
        className="absolute z-20 bg-white border border-gray-200 rounded-lg shadow-lg"
        style={{
          width: "310px",
          height: `${tooltipPosition.height}px`,
          left: `${tooltipPosition.x - 155}px`,
          top:
            tooltipPosition.y < 120
              ? `${tooltipPosition.y + 50}px`
              : `${tooltipPosition.y - tooltipPosition.height - 10}px`,
        }}
      >
        <div className="p-2">
          <div
            className="space-y-1 overflow-y-auto"
            style={{ maxHeight: `${tooltipPosition.height - 16}px` }}
          >
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex items-center gap-2"
                style={{ height: "32px" }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: getScheduleTypeColor(schedule.type),
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">
                    {schedule.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarTooltip;
