import { useState, useRef, useEffect } from "react";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";
import checkedIcon from "../../assets/icons/ic_check_pressed.svg";
import checkIcon from "../../assets/icons/ic_check_de.svg";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  singleSelect?: boolean;
}

const MultiSelectDropdown = ({
  label,
  options,
  singleSelect = false,
}: MultiSelectDropdownProps) => {
  const [selected, setSelected] = useState<string[]>([]);
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

  const toggleOption = (option: string) => {
    setSelected((prev) => {
      if (singleSelect) {
        return prev.includes(option) ? [] : [option];
      } else {
        return prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option];
      }
    });
  };

  const reset = () => setSelected([]);
  const apply = () => {
    setOpen(false);
    console.log("적용됨:", selected);
  };

  const getButtonLabel = () => {
    if (selected.length === 0) return label;
    const fullText = selected.join(" · ");
    return fullText.length > 8 ? fullText.slice(0, 8) + "..." : fullText;
  };

  const isSelected = selected.length > 0;

  // 옵션 세로로 5개씩
  const chunkArray = (arr: string[], itemsPerColumn: number): string[][] => {
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += itemsPerColumn) {
      result.push(arr.slice(i, i + itemsPerColumn));
    }
    return result;
  };

  const numRows = 5;
  const columns = chunkArray(options, numRows);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          inline-flex items-center gap-2 px-5 h-12 rounded-full border-[2px] text-xl font-normal
          ${isSelected ? "border-[#3A3ADB] bg-[#ECECFC]" : "border-[#D9DADD] bg-white"}
          text-[#000000] max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis
        `}
      >
        {getButtonLabel()}
        <img src={downIcon28} alt="열기" />
      </button>

      {open && (
        <div className="absolute mt-2 p-6 bg-white shadow-md rounded-xl z-10">
          <div className="flex gap-x-20 mb-8 pr-20">
            {columns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-y-5">
                {column.map((opt) => {
                  const isChecked = selected.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="w-30 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <img
                        src={isChecked ? checkedIcon : checkIcon}
                        alt={isChecked ? "선택됨" : "선택 안됨"}
                        className="flex-shrink-0"
                      />
                      <span className="text-xl font-regular text-[#000000]">
                        {opt}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={() => toggleOption(opt)}
                      />
                    </label>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              onClick={reset}
              className="w-24 h-8 flex items-center justify-center gap-1 bg-[#C5C6CB] rounded text-[#37383E] text-base"
            >
              <img src={resetIcon} alt="초기화" className="w-5 h-5" />
              초기화
            </button>

            <button
              onClick={apply}
              className="w-24 h-8 bg-[#3A3ADB] rounded text-white text-base"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
