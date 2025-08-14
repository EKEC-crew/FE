import CheckboxGroup from "../common/CheckBoxGroup";
import type { CheckOption } from "../common/CheckBoxGroup";
import canon from "./cannon";
const ETC_LABEL = "기타";
const DEFAULT_ETC_VALUE = ETC_LABEL;

type Props = {
  order: number;
  question: string;
  required: boolean;
  options: string[]; // 폼에서 온 라벨 리스트
  selected: string[]; // 체크된 라벨들
  etcText?: string; // 서버에서 온 기타 텍스트(여러 줄 가능)
  onChange: (next: string[]) => void;
  onEtcTextChange?: (text: string) => void;
};

export default function CheckboxQuestion({
  order,
  question,
  required,
  options,
  selected,
  etcText,
  onChange,
  onEtcTextChange,
}: Props) {
  const normalizedOptions = options.map(canon);

  // 서버 기타 문자열 → 줄바꿈 기준으로 분리
  const etcValuesFromServer =
    typeof etcText === "string"
      ? etcText.split("\n").map(canon).filter(Boolean)
      : [];

  // 기타 옵션의 value: 서버 값이 있으면 그 값(첫 줄), 없으면 기본값
  const resolvedEtcValue = etcValuesFromServer[0] ?? DEFAULT_ETC_VALUE;

  // 옵션 구성(기타 포함)
  const checkOptions: CheckOption[] = [
    ...normalizedOptions.map((o) => ({ label: o, value: o })),
    { label: ETC_LABEL, value: resolvedEtcValue, isEtc: true },
  ];

  // 렌더 선택값: 기존 + (기타가 있으면 기타도 체크)
  const renderSelected =
    etcValuesFromServer.length > 0
      ? Array.from(new Set([...selected.map(canon), resolvedEtcValue]))
      : selected.map(canon);

  // ✅ 이 줄 추가
  const textareaValue = etcText ?? "";

  return (
    <div className="bg-[#F7F7FB] rounded-xl py-6 px-10">
      <p className="text-[22px] font-semibold mb-3">
        {order}. {question}
        {required && <span className="text-red-500"> *</span>}
      </p>

      <CheckboxGroup
        options={checkOptions}
        value={renderSelected}
        onChange={onChange}
        etcText={textareaValue} // ✅ 여기 바꿈
        onEtcTextChange={onEtcTextChange}
      />
    </div>
  );
}
