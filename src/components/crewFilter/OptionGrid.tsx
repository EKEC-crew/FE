import { useState } from "react";

interface OptionItem {
  label: string;
  value: string;
  icon: string;
}

interface OptionGridProps {
  options: OptionItem[];
  type: "single" | "multiple";
  exclusivePairs?: [string, string][];
}

const OptionGrid = ({
  options,
  type,
  exclusivePairs = [],
}: OptionGridProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isOptionDisabled = (value: string) => {
    if (
      type === "single" &&
      selectedItems.length > 0 &&
      !selectedItems.includes(value)
    ) {
      return true;
    }
    if (type === "multiple") {
      for (const [a, b] of exclusivePairs) {
        if (selectedItems.includes(a) && value === b) return true;
        if (selectedItems.includes(b) && value === a) return true;
      }
    }
    return false;
  };

  const toggleItem = (value: string) => {
    if (type === "single") {
      setSelectedItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setSelectedItems((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-wrap gap-8 px-15 py-10 items-center">
        {options.map((option) => {
          const isSelected = selectedItems.includes(option.value);
          const isDisabled = isOptionDisabled(option.value);
          return (
            <div
              key={option.value}
              onClick={() => !isDisabled && toggleItem(option.value)}
              className="w-[100px] h-[110px] flex flex-col items-center text-center cursor-pointer"
            >
              <div
                className={`w-[70px] h-[70px] rounded-[10px] shadow-md flex items-center justify-center 
                  ${isDisabled ? "bg-[#D9DADD]" : isSelected ? "bg-[#E3FBFC]" : "bg-[#FFFFFF]"}`}
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className={`w-[60px] h-[60px] ${isDisabled ? "grayscale brightness-[0.5]" : ""}`}
                />
              </div>
              <p
                className={`mt-2 text-lg ${
                  isSelected
                    ? "text-[#3A3ADB] font-medium"
                    : "text-[#37383E] font-reqular"
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
