import React from "react";
import {
  getScheduleTypeColor,
  getScheduleTypeLabel,
} from "../../../../utils/calendar";

const CalendarLegend: React.FC = () => {
  return (
    <div className="flex flex-col items-end gap-1 mb-2 pr-2">
      <div className="flex items-center gap-1 text-sm">
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: getScheduleTypeColor(0),
            display: "inline-block",
          }}
        />
        {getScheduleTypeLabel(0)}
      </div>
      <div className="flex items-center gap-1 text-sm">
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: getScheduleTypeColor(1),
            display: "inline-block",
          }}
        />
        {getScheduleTypeLabel(1)}
      </div>
    </div>
  );
};

export default CalendarLegend;
