import { useState, useEffect } from "react";
import DropDown from "../../../auth/createProfile/dropDown";

interface DateSelectorProps {
  onDateChange?: (date: Date | null) => void;
  selectedDate?: Date | null;
}

const DateSelector = ({ onDateChange, selectedDate }: DateSelectorProps) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // selectedDate가 변경될 때 내부 state 동기화
  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setYear(String(date.getFullYear()));
      setMonth(String(date.getMonth() + 1));
      setDay(String(date.getDate()));
    } else {
      setYear("");
      setMonth("");
      setDay("");
    }
  }, [selectedDate]);

  // 현재 년도부터 미래 10년까지의 옵션 생성
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear + i),
    label: `${currentYear + i}년`,
  }));

  // 월 옵션 생성 (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `${String(i + 1).padStart(2, "0")}월`,
  }));

  // 일 옵션 생성 (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: `${String(i + 1).padStart(2, "0")}일`,
  }));

  // 선택된 값의 표시 텍스트 생성 (년/월/일 유지)
  const getDisplayText = (value: string, type: "year" | "month" | "day") => {
    if (!value) return "";

    switch (type) {
      case "year":
        return `${value}년`;
      case "month":
        return `${String(value).padStart(2, "0")}월`;
      case "day":
        return `${String(value).padStart(2, "0")}일`;
      default:
        return value;
    }
  };

  // 날짜가 변경될 때마다 부모 컴포넌트에 알림
  const updateDate = (newYear: string, newMonth: string, newDay: string) => {
    if (newYear && newMonth && newDay && onDateChange) {
      const date = new Date(
        parseInt(newYear),
        parseInt(newMonth) - 1,
        parseInt(newDay)
      );
      onDateChange(date);
    } else if (onDateChange) {
      onDateChange(null);
    }
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    updateDate(value, month, day);
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
    updateDate(year, value, day);
  };

  const handleDayChange = (value: string) => {
    setDay(value);
    updateDate(year, month, value);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-sm">
        날짜 선택 <span className="text-red-500 text-base">*</span>
      </label>
      <div className="flex gap-3">
        {/* 연도 선택 */}
        <div style={{ width: "180px", height: "50px" }}>
          <DropDown
            width="180px"
            placeholder="0000년"
            options={yearOptions}
            value={year}
            onChange={handleYearChange}
            getDisplayValue={(value) => getDisplayText(value, "year")}
          />
        </div>

        {/* 월 선택 */}
        <div style={{ width: "130px", height: "50px" }}>
          <DropDown
            width="130px"
            placeholder="00월"
            options={monthOptions}
            value={month}
            onChange={handleMonthChange}
            getDisplayValue={(value) => getDisplayText(value, "month")}
          />
        </div>

        {/* 일 선택 */}
        <div style={{ width: "130px", height: "50px" }}>
          <DropDown
            width="130px"
            placeholder="00일"
            options={dayOptions}
            value={day}
            onChange={handleDayChange}
            getDisplayValue={(value) => getDisplayText(value, "day")}
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
