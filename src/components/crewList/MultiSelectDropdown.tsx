import { useState, useRef, useEffect } from "react";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";
import checkedIcon from "../../assets/icons/ic_check_pressed.svg";
import checkIcon from "../../assets/icons/ic_check_de.svg";
import deactIcon from "../../assets/icons/ic_check_Deact.svg";

interface DropdownOption {
  label: string;
  value: number;
  icon?: string;
}

interface MultiSelectDropdownProps {
  label: string;
  options: DropdownOption[];
  singleSelect?: boolean;
  selected: number[];
  onChange: (selected: number[]) => void;
  exclusivePairs?: [number, number][];
}

const MultiSelectDropdown = ({
  label,
  options,
  singleSelect = false,
  selected,
  onChange,
  exclusivePairs = [],
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<number[]>(selected); // 내부 상태
  const ref = useRef<HTMLDivElement>(null);

  // 외부 selected가 바뀌면 내부 상태도 동기화
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  // 외부 클릭 시 드롭다운 닫힘
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onChange(localSelected);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, localSelected, onChange]);

  const toggleOption = (value: number) => {
    setLocalSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : singleSelect
          ? [value]
          : [...prev, value]
    );
  };

  // 비활성화 옵션
  const getDisabledOptions = (): Set<number> => {
    const map = new Map<number, number[]>();
    for (const [a, b] of exclusivePairs) {
      if (!map.has(a)) map.set(a, []);
      if (!map.has(b)) map.set(b, []);
      map.get(a)!.push(b);
      map.get(b)!.push(a);
    }

    const disabled = new Set<number>();
    for (const val of localSelected) {
      const conflicts = map.get(val) || [];
      conflicts.forEach((c) => {
        if (!localSelected.includes(c)) {
          disabled.add(c);
        }
      });
    }

    return disabled;
  };

  const disabledOptions = getDisabledOptions();

  const reset = () => {
    setLocalSelected([]);
    onChange([]); // 부모 상태도 리셋
  };
  const apply = () => {
    onChange(localSelected); // 적용하기 눌렀을 때만 반영
    setOpen(false);
  };

  const getButtonLabel = () => {
    if (localSelected.length === 0) return label;
    const selectedLabels = localSelected
      .map((val) => options.find((opt) => opt.value === val)?.label)
      .filter(Boolean) as string[];
    const fullText = selectedLabels.join(" · ");
    return fullText.length > 8 ? fullText.slice(0, 8) + "..." : fullText;
  };

  const isSelected = localSelected.length > 0;

  // 옵션 세로로 5개씩
  const chunkArray = (
    arr: DropdownOption[],
    itemsPerColumn: number
  ): DropdownOption[][] => {
    const result: DropdownOption[][] = [];
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
          inline-flex items-center gap-2 px-5 h-12 rounded-full border-[2px] text-xl font-normal cursor-pointer
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
                  const isChecked = localSelected.includes(opt.value);
                  const isDisabled = disabledOptions.has(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className="w-30 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <img
                        src={
                          isDisabled
                            ? deactIcon
                            : isChecked
                              ? checkedIcon
                              : checkIcon
                        }
                        alt={
                          isDisabled
                            ? "선택 불가"
                            : isChecked
                              ? "선택됨"
                              : "선택 안됨"
                        }
                        title={isDisabled ? "선택 불가" : opt.label}
                        className="flex-shrink-0"
                      />
                      <span className="text-xl font-normal text-[#000000]">
                        {opt.label}
                      </span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => {
                          if (!isDisabled) toggleOption(opt.value);
                        }}
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
