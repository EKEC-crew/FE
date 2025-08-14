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
  /** 보기 전용(선택 불가) */
  readOnly?: boolean;
  /** 아이콘 노출 (기본: readOnly면 false, 아니면 true) */
  showIcons?: boolean;
}

type SingleSelectProps = {
  type: "single";
  selected: number;
  onChange: (selected: number) => void;
  /** 단일 선택에서 재클릭 시 해제 허용 여부 (기본 false) */
  allowEmpty?: boolean;
  /** 해제 시 내려줄 값 (기본 0) */
  emptyValue?: number;
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
    minSelectCount = 0, // 기본은 최소 제한 없음
    selected,
    onChange,
    readOnly = false,
    showIcons: showIconsProp,
  } = props as any;

  const showIcons =
    typeof showIconsProp === "boolean" ? showIconsProp : !readOnly;
  const isSingle = type === "single";

  const exclusionMap = new Map<number, number[]>();
  exclusivePairs.forEach(([a, b]: ExclusivePair) => {
    if (!exclusionMap.has(a)) exclusionMap.set(a, []);
    if (!exclusionMap.has(b)) exclusionMap.set(b, []);
    exclusionMap.get(a)!.push(b);
    exclusionMap.get(b)!.push(a);
  });

  const handleClick = (value: number) => {
    if (readOnly) return; // 보기 전용이면 동작 X

    if (isSingle) {
      const { allowEmpty = false, emptyValue = 0 } = props as SingleSelectProps;
      if (allowEmpty && selected === value) {
        onChange(emptyValue);
        return;
      }
      onChange(value);
      return;
    }

    // multiple
    const isSelected = (selected as number[]).includes(value);
    let updated = [...(selected as number[])];

    if (isSelected) {
      if (updated.length <= minSelectCount) return;
      updated = updated.filter((item) => item !== value);
    } else {
      if (maxSelectCount && updated.length >= maxSelectCount) return;
      const exclusives = exclusionMap.get(value) || [];
      updated = updated.filter((item) => !exclusives.includes(item));
      updated.push(value);
    }

    onChange(updated);
  };

  const isSelected = (value: number) =>
    isSingle ? selected === value : (selected as number[]).includes(value);

  const isExcluded = (value: number) => {
    if (isSingle) return false;
    const exclusives = exclusionMap.get(value) || [];
    return exclusives.some((ex) => (selected as number[]).includes(ex));
  };

  const isDisabled = (value: number) => {
    if (readOnly) return true; // 보기 전용이면 항상 비활성화
    if (isSingle) return false;

    const list = selected as number[];
    const currentlySelected = list.includes(value);

    if (!currentlySelected) {
      if (
        (maxSelectCount && list.length >= maxSelectCount) ||
        isExcluded(value)
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map(({ label, value }: OptionItem) => {
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
              text-xl font-normal whitespace-nowrap transition
              ${readOnly ? "cursor-default" : "cursor-pointer"}
              ${selectedItem ? "bg-[#ECECFC] border-[#3A3ADB]" : ""}
              ${excluded ? "bg-[#EFF0F4] border-[#93959D] text-[#93959D]" : ""}
              ${!selectedItem && !excluded ? "border-[#D9DADD] text-[#000000]" : ""}
              ${disabled ? "opacity-90" : ""}
            `}
          >
            {selectedItem ? (
              <>
                {label}
                {showIcons && <img src={closeIcon} alt="삭제" />}
              </>
            ) : (
              <>
                {showIcons &&
                  (showMinus ? (
                    <img src={minusIcon} alt="제외" />
                  ) : (
                    <img src={plusIcon} alt="추가" />
                  ))}
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
