import manIcon from "../../assets/icons/ic_man_28.svg";
import womanIcon from "../../assets/icons/ic_woman_28.svg";

interface GenderSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const GenderSelect = ({
  value,
  onChange,
  disabled = false,
}: GenderSelectProps) => {
  const genderOptions = [
    { label: "남성", value: "male", icon: manIcon },
    { label: "여성", value: "female", icon: womanIcon },
  ];

  return (
    <div className="flex gap-4">
      {genderOptions.map(({ label, value: optionValue, icon }) => {
        const isActive = value === optionValue;
        return (
          <button
            key={optionValue}
            onClick={() => !disabled && onChange(optionValue)}
            className={`h-12 px-5 flex items-center justify-center gap-1 rounded-full border-[2px] text-xl font-normal text-[#000000] cursor-pointer
              ${
                disabled
                  ? "cursor-not-allowed border-[#D9DADD] text-[#D9DADD] bg-[#F7F7FB]"
                  : isActive
                    ? "border-[#3A3ADB] bg-[#ECECFC] text-black"
                    : "border-[#D9DADD] bg-white text-black"
              }
            `}
            disabled={disabled}
          >
            <img
              src={icon}
              alt={label}
              className={`${disabled ? "opacity-10" : ""}`}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default GenderSelect;
