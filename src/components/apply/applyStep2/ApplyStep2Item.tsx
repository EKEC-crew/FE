import { QUESTION_TYPE } from "../../../types/apply/types";
import type { ApiQuestion } from "../../../types/apply/types";
import CheckboxQuestion from "./CheckboxQuesition";
import LongTextQuestion from "./LongTextQuesition";

type Props = {
  order: number;
  q: ApiQuestion;
  options: string[];
  selected: string[] | string;
  etcText?: string;
  onCheckboxChange: (next: string[]) => void;
  onEtcTextChange?: (text: string) => void;
  onTextInput: (value: string) => void;
};

export default function CustomQuestionItem({
  order,
  q,
  options,
  selected,
  etcText,
  onCheckboxChange,
  onEtcTextChange,
  onTextInput,
}: Props) {
  if (q.questionType === QUESTION_TYPE.CHECKBOX) {
    // 체크박스 전용 컴포넌트
    return (
      <CheckboxQuestion
        order={order}
        question={q.question}
        required={q.required === 1}
        options={options}
        selected={Array.isArray(selected) ? selected : []}
        etcText={q.isEtc === 1 ? etcText : undefined}
        onChange={onCheckboxChange}
        onEtcTextChange={onEtcTextChange}
      />
    );
  }

  // 장문 전용 컴포넌트
  return (
    <LongTextQuestion
      order={order}
      question={q.question}
      required={q.required === 1}
      value={(selected as string) ?? ""}
      onTextInput={onTextInput}
    />
  );
}
