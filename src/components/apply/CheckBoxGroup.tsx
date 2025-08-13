import Checkbox from "./CheckBox";

export type CheckOption = { label: string; value: string; isEtc?: boolean };

const canon = (v: unknown) =>
  String(v ?? "")
    .normalize("NFC")
    .replace(/\u200B/g, "")
    .trim();

type Props = {
  options: CheckOption[];
  value: string[];
  onChange: (next: string[]) => void;
  etcText?: string;
  onEtcTextChange?: (text: string) => void;
};

export default function CheckboxGroup({
  options,
  value,
  onChange,
  etcText,
  onEtcTextChange,
}: Props) {
  const safeSelected = (value ?? []).map(canon);

  const handleToggle = (vRaw: string, nextChecked: boolean) => {
    const v = canon(vRaw);
    const next = nextChecked
      ? Array.from(new Set([...safeSelected, v]))
      : safeSelected.filter((x) => x !== v);

    const opt = options.find((o) => canon(o.value) === v);
    if (opt?.isEtc && !nextChecked && onEtcTextChange) onEtcTextChange("");
    onChange(next);
  };

  const etcOption = options.find((o) => o.isEtc);
  const etcChecked =
    !!etcOption && safeSelected.includes(canon(etcOption.value));

  return (
    <div className="flex flex-col gap-2">
      {options.map((o) => {
        const v = canon(o.value);
        const checked = safeSelected.includes(v);
        return (
          <Checkbox
            key={v}
            label={o.label}
            value={o.value}
            checked={checked}
            onToggle={handleToggle}
          />
        );
      })}

      {etcOption && etcChecked && (
        <textarea
          className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm"
          placeholder="기타 내용을 입력해주세요"
          value={etcText ?? ""}
          onChange={(e) => onEtcTextChange?.(e.target.value)}
        />
      )}
    </div>
  );
}
