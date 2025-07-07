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
          inline-flex items-center gap-2 px-[20px] h-[50px] rounded-full border-[2px] text-[20px] font-normal
          ${isSelected ? "border-[#3A3ADB] bg-[#ECECFC]" : "border-[#D9DADD] bg-white"}
          text-[#000000] max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis
        `}
      >
        {getButtonLabel()}
        <img src={downIcon28} alt="열기" />
      </button>

      {open && (
        <div className="absolute mt-2 p-6 bg-white shadow-md rounded-xl z-10">
          <div className="flex gap-x-[80px] mb-8 pr-[80px]">
            {columns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-y-[20px]">
                {column.map((opt) => {
                  const isChecked = selected.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="w-[120px] flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <img
                        src={isChecked ? checkedIcon : checkIcon}
                        alt={isChecked ? "선택됨" : "선택 안됨"}
                        className="w-[26px] h-[26px] flex-shrink-0"
                      />
                      <span className="text-[20px] font-[400] text-[#000000]">
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
              className="w-[101px] h-[30px] flex items-center justify-center gap-1 bg-[#C5C6CB] rounded text-[#37383E] text-[14px]"
            >
              <img src={resetIcon} alt="초기화" className="w-[16px] h-[16px]" />
              초기화
            </button>

            <button
              onClick={apply}
              className="w-[91px] h-[29px] bg-[#3A3ADB] rounded text-white text-[14px]"
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
