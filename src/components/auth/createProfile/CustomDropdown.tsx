import { useState } from "react";
import downIcon from "../../../assets/icons/ic_Down_28.svg";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  width: string; // 1920*1080 기준 상대 단위 (예: "9.375vw" = 180px)
  height: string; // 1920*1080 기준 상대 단위 (예: "4.63vh" = 50px)
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  getDisplayValue: (value: string) => string;
}

const CustomDropdown = ({
  width,
  height,
  placeholder,
  options,
  value,
  onChange,
  getDisplayValue,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* 드롭다운 버튼 */}
      <div
        className="w-full px-3.5 py-2.5 bg-white rounded-[50px] outline-2 outline-offset-[-2px] outline-zinc-300 text-black text-xl font-normal font-['Pretendard'] cursor-pointer flex items-center justify-between"
        style={{ height }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value ? getDisplayValue(value) : placeholder}
        </span>
        <div className="w-7 h-7 flex items-center justify-center">
          <img
            src={downIcon}
            alt="아래 화살표"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* 드롭다운 옵션 목록 - 아래로만 펼쳐짐 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-white rounded-[20px] shadow-lg border border-gray-200 z-50 overflow-y-auto"
          style={{
            maxHeight: "25vh", // 최대 높이 제한
            marginTop: "0.25rem", // 버튼과 옵션 목록 사이 간격
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3.5 py-2.5 text-black text-xl font-normal font-['Pretendard'] cursor-pointer hover:bg-gray-100 first:rounded-t-[20px] last:rounded-b-[20px]"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* 클릭 영역 외부 클릭 시 드롭다운 닫기 */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CustomDropdown;
