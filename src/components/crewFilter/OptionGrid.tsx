interface OptionItem {
  label: string;
  value: string;
  icon: string;
}

interface OptionGridProps {
  options: OptionItem[];
  type: "single" | "multiple";
  exclusivePairs?: [string, string][];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const OptionGrid = ({
  options,
  type,
  exclusivePairs = [],
  selected,
  onChange,
}: OptionGridProps) => {
  const isOptionDisabled = (value: string) => {
    if (type === "single" && selected.length > 0 && !selected.includes(value)) {
      return true;
    }
    if (type === "multiple") {
      for (const [a, b] of exclusivePairs) {
        if (selected.includes(a) && value === b) return true;
        if (selected.includes(b) && value === a) return true;
      }
    }
    return false;
  };

  const toggleItem = (value: string) => {
    let updated: string[];
    if (type === "single") {
      updated = selected.includes(value) ? [] : [value];
    } else {
      updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
    }
    onChange(updated);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap gap-8 px-15 py-10 items-center">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const isDisabled = isOptionDisabled(option.value);
          return (
            <div
              key={option.value}
              onClick={() => !isDisabled && toggleItem(option.value)}
              className="w-25 h-27 flex flex-col items-center text-center cursor-pointer"
            >
              <div
                className={`w-17 h-17 rounded-xl shadow-md flex items-center justify-center 
                  ${isDisabled ? "bg-[#D9DADD]" : isSelected ? "bg-[#E3FBFC]" : "bg-[#FFFFFF]"}`}
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className={`w-15 h-15 ${isDisabled ? "grayscale brightness-[0.5]" : ""}`}
                />
              </div>
              <p
                className={`mt-2 text-lg ${
                  isSelected
                    ? "text-[#3A3ADB] font-medium"
                    : "text-[#37383E] font-normal"
                }`}
              >
                {option.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionGrid;
