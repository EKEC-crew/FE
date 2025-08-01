import closeIcon from "../../assets/icons/ic_dissmiss_28.svg";
import plusIcon from "../../assets/icons/ic_plus_ arrow.svg";
import minusIcon from "../../assets/icons/ic_minus_ arrow.svg";

interface OptionItem {
  label: string;
  value: number;
}

type ExclusivePair = [number, number];

interface OptionGridBaseProps {
  options: OptionItem[];
  exclusivePairs?: ExclusivePair[];
  maxSelectCount?: number;
  minSelectCount?: number;
}

type SingleSelectProps = {
  type: "single";
  selected: number | null;
  onChange: (selected: number) => void;
} & OptionGridBaseProps;

type MultiSelectProps = {
  type: "multiple";
  selected: number[];
  onChange: (selected: number[]) => void;
} & OptionGridBaseProps;

type OptionGridProps = SingleSelectProps | MultiSelectProps;

const OptionGrid = (props: OptionGridProps) => {
  const {
    options,
    type,
    exclusivePairs = [],
    maxSelectCount,
    selected,
    onChange,
  } = props;

  const isSingle = type === "single";

  const exclusionMap = new Map<number, number[]>();
  exclusivePairs.forEach(([a, b]) => {
    if (!exclusionMap.has(a)) exclusionMap.set(a, []);
    if (!exclusionMap.has(b)) exclusionMap.set(b, []);
    exclusionMap.get(a)!.push(b);
    exclusionMap.get(b)!.push(a);
  });

  const handleClick = (value: number) => {
    if (isSingle) {
      onChange(value);
      return;
    }

    const isSelected = selected.includes(value);
    let updated = [...selected];

    if (isSelected) {
      updated = updated.filter((item) => item !== value);
    } else {
      if (maxSelectCount && selected.length >= maxSelectCount) return;

      const exclusives = exclusionMap.get(value) || [];
      updated = updated.filter((item) => !exclusives.includes(item));

      updated.push(value);
    }

    onChange(updated);
  };

  const isSelected = (value: number) =>
    isSingle ? selected === value : selected.includes(value);

  const isExcluded = (value: number) => {
    if (isSingle) return false;
    const exclusives = exclusionMap.get(value) || [];
    return exclusives.some((ex) => selected.includes(ex));
  };

  const isDisabled = (value: number) => {
    if (isSingle) return false;
    return (
      !selected.includes(value) &&
      ((maxSelectCount && selected.length >= maxSelectCount) ||
        isExcluded(value))
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map(({ label, value }) => {
        const selectedItem = isSelected(value);
        const excluded = isExcluded(value);
        const disabled = isDisabled(value);
        const showMinus = excluded;

        return (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            disabled={disabled}
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
