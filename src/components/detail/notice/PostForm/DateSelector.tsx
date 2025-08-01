import { useState } from "react";

const DateSelector = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");


  const getClassName = (value: string) => {
    return `w-[120px] px-4 py-2 pr-8 text-center text-sm rounded-2xl border appearance-none ${
      value ? "bg-[#E5E5FF] border-[#3A3ADB]" : "bg-white border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-[#3A3ADB]`;
  };

  const SelectWrapper = ({
    value,
    onChange,
    children,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
  }) => (
    <div className="relative">
      <select value={value} onChange={onChange} className={getClassName(value)}>
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
        ▼
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-sm">
        날짜 선택 <span className="text-red-500 text-base">*</span>
      </label>
      <div className="flex gap-3">
        {/* 연도 선택 */}
        <SelectWrapper value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">0000년</option>
          {[2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </SelectWrapper>

        {/* 월 선택 */}
        <SelectWrapper value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">00월</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {String(i + 1).padStart(2, "0")}월
            </option>
          ))}
        </SelectWrapper>

        {/* 일 선택 */}
        <SelectWrapper value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">00일</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {String(i + 1).padStart(2, "0")}일
            </option>
          ))}
        </SelectWrapper>
      </div>
    </div>
  );
};

export default DateSelector;
