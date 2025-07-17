import { useState } from "react";
import DropDown from "./dropDown";

const BirthDropDown = () => {
  // 현재 날짜 정보 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0부터 시작하므로 +1
  const currentDay = currentDate.getDate();

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // 선택된 값을 한글 포함해서 표시하는 함수들
  const getYearDisplayValue = (value: string) => (value ? `${value}년생` : "");
  const getMonthDisplayValue = (value: string) =>
    value ? `${value.padStart(2, "0")}월` : "";
  const getDayDisplayValue = (value: string) =>
    value ? `${value.padStart(2, "0")}일` : "";

  // 현재 년도부터 1900년까지의 년도 배열 생성
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  // 1월부터 12월까지의 월 배열 생성
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 년, 월에 따른 일수 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days =
    selectedYear && selectedMonth
      ? Array.from(
          {
            length: getDaysInMonth(
              parseInt(selectedYear),
              parseInt(selectedMonth)
            ),
          },
          (_, i) => i + 1
        )
      : Array.from({ length: 31 }, (_, i) => i + 1); // 기본적으로 31일까지

  // 드롭다운 옵션 배열 생성
  const yearOptions = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const monthOptions = months.map((month) => ({
    value: month.toString(),
    label: month.toString().padStart(2, "0"),
  }));

  const dayOptions = days.map((day) => ({
    value: day.toString(),
    label: day.toString().padStart(2, "0"),
  }));

  return (
    <div>
      <div
        className="flex justify-between items-center mb-6"
        style={{ width: "27.08vw" }}
      >
        {/* 년도 드롭다운 */}
        <DropDown
          width="8.33vw" // (27.08vw - 2*1.04vw) / 3 = 8.33vw
          height="4.63vh"
          placeholder={`${currentYear}년생`}
          options={yearOptions}
          value={selectedYear}
          onChange={setSelectedYear}
          getDisplayValue={getYearDisplayValue}
        />

        {/* 월 드롭다운 */}
        <DropDown
          width="8.33vw" // (27.08vw - 2*1.04vw) / 3 = 8.33vw
          height="4.63vh"
          placeholder={`${currentMonth.toString().padStart(2, "0")}월`}
          options={monthOptions}
          value={selectedMonth}
          onChange={setSelectedMonth}
          getDisplayValue={getMonthDisplayValue}
        />

        {/* 일 드롭다운 */}
        <DropDown
          width="8.33vw" // (27.08vw - 2*1.04vw) / 3 = 8.33vw
          height="4.63vh"
          placeholder={`${currentDay.toString().padStart(2, "0")}일`}
          options={dayOptions}
          value={selectedDay}
          onChange={setSelectedDay}
          getDisplayValue={getDayDisplayValue}
        />
      </div>
    </div>
  );
};

export default BirthDropDown;
