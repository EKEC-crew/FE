import unActiveBtn from "../../assets/icons/ic_radio_de.svg";
import activeBtn from "../../assets/icons/ic_radio_pressed.svg";
import { useState } from "react";

interface ToggleListButtonProps {
  title: string;
  iconDefault: string;
  iconActive: string;
  items: string[];
  selected: string;
  setSelected: (value: string) => void;
  name: string;
}

const ToggleListButton = ({
  title,
  iconDefault,
  iconActive,
  items,
  selected,
  setSelected,
  name,
}: ToggleListButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  const [isHover, setHover] = useState(false);

  return (
    <div>
      {/* 토글 버튼 */}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center gap-2 w-[16.25rem] h-[3.4375rem] rounded-[0.625rem] text-[1.25rem] text-left px-4 py-2 
          transition-colors focus:outline-none ${
            isOpen
              ? "bg-[#3A3ADB] text-white"
              : "bg-[#F7F7FB] text-black hover:bg-[#3A3ADB] hover:text-white"
          }`}
      >
        <img
          src={isOpen || isHover ? iconActive : iconDefault}
          alt="아이콘"
          className="w-[2.25rem] h-[2.25rem] object-contain align-middle"
        />
        {title}
      </button>

      {/* 리스트 */}
      {isOpen && (
        <div className="ml-3 mt-3 space-y-2">
          {items.map((item) => (
            <label
              key={item}
              className={`flex items-center w-full h-[3.4375rem] gap-2 text-sm px-4 py-2 rounded-[0.625rem] cursor-pointer transition-colors ${
                selected === item
                  ? "bg-[#F7F7FB] text-black"
                  : "hover:bg-[#F7F7FB] text-black"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={item}
                checked={selected === item}
                onChange={() => setSelected(item)}
                className="hidden"
              />
              <img
                src={selected === item ? activeBtn : unActiveBtn}
                alt="radio"
                className="w-[1.625rem] h-[1.625rem]"
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToggleListButton;
