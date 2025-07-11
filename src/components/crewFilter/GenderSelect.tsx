import { useState } from "react";
import manIcon from "../../assets/icons/ic_man_28.svg";
import womanIcon from "../../assets/icons/ic_woman_28.svg";

const GenderSelect = () => {
  const [selected, setSelected] = useState<string>("");

  const genderOptions = [
    { label: "남성", value: "male", icon: manIcon },
    { label: "여성", value: "female", icon: womanIcon },
  ];

  return (
    <div className="flex gap-4 mt-4">
      {genderOptions.map(({ label, value, icon }) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`w-[103px] h-[50px] flex items-center justify-center gap-1 rounded-full border-[2px] text-[20px] font-normal text-[#000000] transition-colors duration-200
              ${isActive ? "border-[#3A3ADB] bg-[#ECECFC]" : "border-[#D9DADD] bg-white"}`}
          >
            <img src={icon} alt={label} />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default GenderSelect;
