import { useEffect, useRef, useState } from "react";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";

interface HeadcountDropdownProps {
  value: number | null;
  onChange: (value: number) => void;
}

const options = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const HeadcountDropdown = ({ value, onChange }: HeadcountDropdownProps) => {
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

  return (
    <div className="relative w-full h-[50px]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-full border-[2px] rounded-full text-center text-[20px] font-regular flex items-center justify-center gap-2 ${value ? "bg-[#ECECFC] border-[#3A3ADB]" : "bg-white border-[#D9DADD]"}`}
      >
        {value ? `${value}명` : "00명"}
        <img src={downIcon28} alt="열기" className="ml-2" />
      </button>

      {open && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-[#D9DADD] rounded shadow-md z-10">
          {options.map((count) => (
            <li
              key={count}
              onClick={() => {
                onChange(count);
                setOpen(false);
              }}
              className="px-4 py-2 text-center cursor-pointer text-[16px] hover:bg-[#3A3ADB] hover:text-white"
            >
              {count}명
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeadcountDropdown;
