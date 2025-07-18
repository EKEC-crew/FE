import DropDown from "./dropDown";
import { useState, useEffect } from "react";

interface BirthDropDownProps {
  birthDate?: string;
  setBirthDate: (date: string) => void;
}

const BirthDropDown = ({ birthDate, setBirthDate }: BirthDropDownProps) => {
  // 개별 상태로 관리
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // birthDate가 변경되면 개별 값들도 업데이트
  useEffect(() => {
    if (birthDate) {
      const [y, m, d] = birthDate.split("-");
      setYear(y || "");
      setMonth(m || "");
      setDay(d || "");
    }
  }, [birthDate]);

  // 개별 값들이 모두 있을 때만 birthDate 업데이트
  useEffect(() => {
    if (year && month && day) {
      setBirthDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    } else {
      setBirthDate("");
    }
  }, [year, month, day, setBirthDate]);

  const setBirthYear = (value: string) => setYear(value);
  const setBirthMonth = (value: string) => setMonth(value);
  const setBirthDay = (value: string) => setDay(value);
  // 현재 날짜 정보 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

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
    year && month
      ? Array.from(
          {
            length: getDaysInMonth(parseInt(year), parseInt(month)),
          },
          (_, i) => i + 1
        )
      : Array.from({ length: 31 }, (_, i) => i + 1);

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
          value={year}
          onChange={setBirthYear}
          getDisplayValue={getYearDisplayValue}
        />

        {/* 월 드롭다운 */}
        <DropDown
          width="8.33vw" // (27.08vw - 2*1.04vw) / 3 = 8.33vw
          height="4.63vh"
          placeholder={`${currentMonth.toString().padStart(2, "0")}월`}
          options={monthOptions}
          value={month}
          onChange={setBirthMonth}
          getDisplayValue={getMonthDisplayValue}
        />

        {/* 일 드롭다운 */}
        <DropDown
          width="8.33vw" // (27.08vw - 2*1.04vw) / 3 = 8.33vw
          height="4.63vh"
          placeholder={`${currentDay.toString().padStart(2, "0")}일`}
          options={dayOptions}
          value={day}
          onChange={setBirthDay}
          getDisplayValue={getDayDisplayValue}
        />
      </div>
    </div>
  );
};

export default BirthDropDown;
