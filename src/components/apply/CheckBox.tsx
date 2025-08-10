import uncheckedIcon from "../../assets/icons/ic_check_de.svg";
import checkedIcon from "../../assets/icons/ic_check_pressed.svg";

export default function Checkbox({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (value: string, nextChecked: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt, !checked)}
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <img
              src={checked ? checkedIcon : uncheckedIcon}
              alt={checked ? "선택됨" : "선택 안 됨"}
              className="w-5 h-5"
            />
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
