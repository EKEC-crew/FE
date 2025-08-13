import { QUESTION_TYPE } from "../../types/apply/types";
import type { ApiQuestion } from "../../types/apply/types";
import CheckboxGroup from "./CheckBoxGroup";
import type { CheckOption } from "./CheckBoxGroup";
import Textarea from "./TextArea";

const ETC_LABEL = "기타";
const ETC_VALUE = "__ETC__";

export default function CustomQuestionItem({
  order,
  q,
  options,
  selected,
  etcText,
  onCheckboxChange, // (next: string[]) => void
  onEtcTextChange, // (text: string) => void
  onTextInput,
}: {
  order: number;
  q: ApiQuestion;
  options: string[];
  selected: string[] | string;
  etcText?: string;
  onCheckboxChange: (next: string[]) => void;
  onEtcTextChange?: (text: string) => void;
  onTextInput: (value: string) => void;
}) {
  const normalizedOptions = options.map((o) => String(o).trim());
  const checkOptions: CheckOption[] =
    q.questionType === QUESTION_TYPE.CHECKBOX && q.isEtc === 1
      ? [
          ...normalizedOptions.map((o) => ({ label: o, value: o })),
          { label: ETC_LABEL, value: ETC_VALUE, isEtc: true },
        ]
      : normalizedOptions.map((o) => ({ label: o, value: o }));

  return (
    <div className="bg-[#F7F7FB] rounded-xl py-6 px-10">
      <p className="text-[22px] font-semibold mb-3">
        {order}. {q.question}
        {q.required === 1 && <span className="text-red-500"> *</span>}
      </p>

      {q.questionType === QUESTION_TYPE.CHECKBOX && (
        <CheckboxGroup
          options={checkOptions}
          value={Array.isArray(selected) ? selected : []}
          onChange={onCheckboxChange}
          etcText={etcText}
          onEtcTextChange={onEtcTextChange}
        />
      )}

      {q.questionType === QUESTION_TYPE.LONG_TEXT && (
        <Textarea
          rows={1}
          placeholder="답변을 입력해주세요"
          value={(selected as string) ?? ""}
          onInput={(e) =>
            onTextInput((e.currentTarget as HTMLTextAreaElement).value)
          }
        />
      )}
    </div>
  );
}
