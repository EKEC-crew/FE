import { useState, useRef, useEffect } from "react";
import downIcon from "../../../assets/icons/ic_Down_28.svg";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropDownProps {
  width?: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  getDisplayValue?: (value: string) => string;
  disabled?: boolean; // 드롭다운 비활성화 여부
}

const DropDown = ({
  width,
  placeholder,
  options,
  value,
  onChange,
  getDisplayValue,
  disabled = false, // 기본값 false
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const containerClasses = `relative ${width ? "" : "w-full"}`;
  const containerStyle = width ? { width } : {};

  const isActive = value !== "" && value !== null;

  return (
    <div className={containerClasses} style={containerStyle} ref={dropdownRef}>
      <div
        className={`w-full h-[50px] flex items-center justify-between px-3.5 py-2.5 rounded-[50px] border-2 text-xl font-normal transition-all duration-200 outline-none ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 border-gray-400"
            : isActive
              ? "border-[#3A3ADB] bg-[#ECECFC] text-black cursor-pointer"
              : "border-[#D9DADD] bg-white text-black cursor-pointer"
        }`}
        onClick={() => {
          if (!disabled) toggleOpen();
        }}
      >
        <span>{value ? getDisplayValue?.(value) || value : placeholder}</span>
        <img
          src={downIcon}
          alt="화살표"
          className={`w-7 h-7 transition-transform duration-200 ${
            isOpen && !disabled ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && !disabled && (
        <div
          className="absolute left-0 mt-1 w-full bg-white rounded-[20px] shadow-lg border border-gray-200 z-50 overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3.5 py-2.5 text-black text-xl font-normal cursor-pointer hover:bg-gray-100 first:rounded-t-[20px] last:rounded-b-[20px]"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
