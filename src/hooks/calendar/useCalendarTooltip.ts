import { useState } from "react";

interface TooltipPosition {
  x: number;
  y: number;
  height: number;
}

export const useCalendarTooltip = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);

  const showTooltip = (date: Date, position: TooltipPosition) => {
    setSelectedDate(date);
    setTooltipPosition(position);
  };

  const hideTooltip = () => {
    setSelectedDate(null);
    setTooltipPosition(null);
  };

  return {
    selectedDate,
    tooltipPosition,
    showTooltip,
    hideTooltip,
  };
};
