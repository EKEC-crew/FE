import { useState, useEffect } from "react";
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
  readOnly?: boolean; // ✅ 추가
};

export default function CheckboxGroup({
  options,
  value,
  onChange,
  etcText,
  onEtcTextChange,
  readOnly = false, // ✅ 추가 (기본값 false)
}: Props) {
  const [inputValue, setInputValue] = useState(etcText ?? "");

  useEffect(() => {
    setInputValue(etcText ?? "");
  }, [etcText]);

  const safeSelected = (value ?? []).map(canon);

  const handleToggle = (vRaw: string, nextChecked: boolean) => {
    const v = canon(vRaw);
    const next = nextChecked
      ? Array.from(new Set([...safeSelected, v]))
      : safeSelected.filter((x) => x !== v);

    const opt = options.find((o) => canon(o.value) === v);
    if (opt?.isEtc && !nextChecked && onEtcTextChange) onEtcTextChange("");
    onChange(next);

    if (opt?.isEtc && !nextChecked) {
      setInputValue("");
      onEtcTextChange?.("");
    }
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
      {etcOption &&
        etcChecked &&
        (readOnly ? (
          <div className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-50 whitespace-pre-wrap">
            {inputValue}
          </div>
        ) : (
          <textarea
            className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm"
            placeholder="기타 내용을 입력해주세요"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value); // ✅ 로컬 상태만 업데이트
            }}
            onBlur={(e) => {
              onEtcTextChange?.(e.target.value); // ✅ 포커스 해제될 때만 부모에게 전송
            }}
          />
        ))}
    </div>
  );
}
