import { useEffect, useRef, useState } from "react";
import downIcon24 from "../../assets/icons/ic_Down_24.svg";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";

interface SingleSelectDropdownProps {
  label: string;
  options: string[];
  onSelect?: (selected: string) => void;
  variant?: "filter" | "sort"; // 버튼 스타일 구분
}

const SingleSelectDropdown = ({
  label,
  options,
  onSelect,
  variant = "filter",
}: SingleSelectDropdownProps) => {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect?.(option);
    setOpen(false);
  };

  const isFilter = variant === "filter";
  const isSelected = selected !== "";
  const buttonLabel = isSelected ? selected : label;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-full text-[20px] font-normal
        ${isFilter ? "h-[50px] px-[20px]" : "h-[40px] px-[16px]"}
        ${
          isFilter
            ? isSelected
              ? "border-[2px] border-[#3A3ADB] bg-[#ECECFC] text-[#000000]"
              : "border-[2px] border-[#D9DADD] bg-white text-[#000000]"
            : "border-[2px] border-[#D9DADD] bg-white text-[#000000]"
        }
        `}
      >
        {buttonLabel}
        <img
          src={isFilter ? downIcon28 : downIcon24}
          alt="열기"
          className={isFilter ? "w-[28px] h-[28px]" : "w-[24px] h-[24px]"}
        />
      </button>

      {open && (
        <div className="absolute mt-2 pt-4 bg-white shadow-md rounded-md z-10 w-max min-w-full">
          <ul className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
            {options.map((opt) => {
              const isOptSelected = selected === opt;
              return (
                <li
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="cursor-pointer w-full"
                >
                  <div
                    className={`w-full px-4 py-2 text-[18px] text-left whitespace-nowrap
                ${
                  isOptSelected
                    ? "bg-[#3A3ADB] text-white font-medium"
                    : "text-[#000000] hover:bg-[#3A3ADB] hover:text-white hover:font-medium"
                }`}
                  >
                    {opt}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropdown;
