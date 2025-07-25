import { useState, useRef, useEffect } from "react";
import downIcon from "../../../assets/icons/ic_Down_28.svg";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropDownProps {
  width: string;
  height: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  getDisplayValue?: (value: string) => string;
}

const DropDown = ({
  width,
  height,
  placeholder,
  options,
  value,
  onChange,
  getDisplayValue,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

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

  return (
    <div className="relative" style={{ width }} ref={dropdownRef}>
      <div
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white rounded-[50px] outline-2 outline-offset-[-2px] outline-zinc-300 text-black text-xl font-normal cursor-pointer"
        style={{ height }}
        onClick={toggleOpen}
      >
        <span className={value ? "text-black" : "text-gray-400"}>
          {value ? getDisplayValue?.(value) || value : placeholder}
        </span>
        <img
          src={downIcon}
          alt="화살표"
          className={`w-7 h-7 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
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
