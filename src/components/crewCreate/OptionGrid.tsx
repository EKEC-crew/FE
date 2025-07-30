import closeIcon from "../../assets/icons/ic_dissmiss_28.svg";
import plusIcon from "../../assets/icons/ic_plus_ arrow.svg";
import minusIcon from "../../assets/icons/ic_minus_ arrow.svg";

interface OptionItem {
  label: string;
  icon?: string;
}

type ExclusivePair = [string, string];

interface OptionGridProps {
  options: OptionItem[];
  type: "single" | "multiple";
  exclusivePairs?: ExclusivePair[];
  maxSelectCount?: number;
  minSelectCount?: number;
  selected: string[];
  onChange: (selected: string[]) => void;
}

const OptionGrid = ({
  options,
  type,
  exclusivePairs = [],
  maxSelectCount,
  selected,
  onChange,
}: OptionGridProps) => {
  const exclusionMap = new Map<string, string[]>();
  exclusivePairs.forEach(([a, b]) => {
    if (!exclusionMap.has(a)) exclusionMap.set(a, []);
    if (!exclusionMap.has(b)) exclusionMap.set(b, []);
    exclusionMap.get(a)!.push(b);
    exclusionMap.get(b)!.push(a);
  });

  const handleClick = (label: string) => {
    const isSelected = selected.includes(label);

    if (type === "single") {
      onChange([label]);
      return;
    }

    let updated = [...selected];

    if (isSelected) {
      updated = updated.filter((item) => item !== label);
    } else {
      if (maxSelectCount && selected.length >= maxSelectCount) return;

      // 배제되는 옵션 제거
      const exclusives = exclusionMap.get(label) || [];
      updated = updated.filter((item) => !exclusives.includes(item));

      updated.push(label);
    }

    onChange(updated);
  };

  const isExcluded = (label: string) => {
    const exclusives = exclusionMap.get(label) || [];
    return exclusives.some((ex) => selected.includes(ex));
  };

  const isDisabled = (label: string) => {
    return (
      !selected.includes(label) &&
      ((maxSelectCount && selected.length >= maxSelectCount) ||
        isExcluded(label))
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map(({ label }) => {
        const selectedItem = selected.includes(label);
        const excluded = isExcluded(label);
        const disabled = isDisabled(label);
        const showMinus = excluded;

        return (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(label)}
            disabled={excluded}
            className={`
              flex items-center gap-2 px-4 h-12 rounded-full border-[2px]
              text-xl font-normal whitespace-nowrap transition cursor-pointer
              ${selectedItem ? "bg-[#ECECFC] border-[#3A3ADB]" : ""}
              ${excluded ? "bg-[#EFF0F4] border-[#93959D] text-[#93959D]" : ""}
              ${!selectedItem && !excluded ? "border-[#D9DADD] text-[#000000]" : ""}
              ${disabled ? "cursor-not-allowed" : ""}
            `}
          >
            {selectedItem ? (
              <>
                {label}
                <img src={closeIcon} alt="삭제" />
              </>
            ) : (
              <>
                {showMinus ? (
                  <img src={minusIcon} alt="제외" />
                ) : (
                  <img src={plusIcon} alt="추가" />
                )}
                {label}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OptionGrid;
