import { QUESTION_TYPE } from "../../types/apply/types";
import type { ApiQuestion } from "../../types/apply/types";
import Checkbox from "./CheckBox";
import Textarea from "./TextArea";

export default function CustomQuestionItem({
  order,
  q,
  options,
  selected,
  onToggleCheckbox,
  onTextInput,
}: {
  order: number;
  q: ApiQuestion;
  options: string[];
  selected: string[] | string;
  onToggleCheckbox: (value: string, nextChecked: boolean) => void;
  onTextInput: (value: string) => void;
}) {
  return (
    <div className="bg-[#F7F7FB] rounded-xl py-6 px-10">
      <p className="text-[22px] font-semibold mb-3">
        {order}. {q.question}
        {q.required === 1 && <span className="text-red-500"> *</span>}
      </p>

      {q.questionType === QUESTION_TYPE.CHECKBOX && (
        <Checkbox
          options={options}
          selected={(selected as string[]) ?? []}
          onChange={onToggleCheckbox}
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
