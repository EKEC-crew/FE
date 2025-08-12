import { useEffect, useRef, useState } from "react";
import downIcon24 from "../../assets/icons/ic_Down_24.svg";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";

interface SingleOption<T = string> {
  label: string;
  value: T;
  icon?: string | React.ReactNode;
  disabled?: boolean;
}

interface SingleSelectDropdownProps<T = string> {
  label: string;
  options: SingleOption<T>[];
  selected: T | null;
  onSelect: (selected: T) => void;
  variant?: "filter" | "sort"; // 버튼 스타일 구분
}

const SingleSelectDropdown = <T,>({
  label,
  options,
  selected,
  onSelect,
  variant = "filter",
}: SingleSelectDropdownProps<T>) => {
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

  const handleSelect = (option: T) => {
    onSelect?.(option);
    setOpen(false);
  };

  const isFilter = variant === "filter";
  const isSelected = selected !== null;

  const selectedOption = options.find((opt) => opt.value === selected);
  const selectedLabel = selectedOption?.label;
  const buttonLabel = selectedLabel || label;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-full text-xl font-normal cursor-pointer
        ${isFilter ? "h-12 px-5" : "h-10 px-4"}
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
        <img src={isFilter ? downIcon28 : downIcon24} alt="열기" />
      </button>

      {open && (
        <div className="absolute mt-2 pt-4 bg-white shadow-md rounded-md z-10 w-max min-w-full">
          <ul className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
            {options.map((opt) => {
              const isOptSelected = selected === opt.value;
              return (
                <li
                  key={opt.label}
                  className="cursor-pointer w-full"
                  onClick={(e) => {
                    if (opt.disabled) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    handleSelect(opt.value);
                  }}
                >
                  <div
                    className={`w-full px-4 py-2 text-lg text-left whitespace-nowrap
                ${
                  isOptSelected
                    ? "bg-[#3A3ADB] text-white font-medium"
                    : "text-[#000000] hover:bg-[#3A3ADB] hover:text-white hover:font-medium"
                }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon && (
                        <span className="inline-block">{opt.icon}</span>
                      )}
                      {opt.label}
                    </div>
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
