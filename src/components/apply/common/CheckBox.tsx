import uncheckedIcon from "../../../assets/icons/ic_check_de.svg";
import checkedIcon from "../../../assets/icons/ic_check_pressed.svg";

type Props = {
  label: string;
  value: string;
  checked: boolean;
  onToggle: (value: string, nextChecked: boolean) => void;
};

export default function Checkbox({ label, value, checked, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={() => onToggle(value, !checked)}
      className="flex items-center gap-2 hover:opacity-90 transition"
      role="checkbox"
      aria-checked={checked}
    >
      <img
        src={checked ? checkedIcon : uncheckedIcon}
        alt={checked ? "선택됨" : "선택 안 됨"}
        className="w-5 h-5"
      />
      <span>{label}</span>
    </button>
  );
}
