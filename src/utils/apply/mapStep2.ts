// src/utils/apply/mapStep2.ts
import { QUESTION_TYPE, type ApiQuestion } from "../../types/apply/types";

/** 화면용 아이템 */
export type QAViewItem =
  | {
      id: number;
      question: string;
      required: boolean;
      type: "CHECKBOX";
      values: string[]; // 선택된 라벨들
      etcText?: string | null; // 기타 텍스트(있으면)
    }
  | {
      id: number;
      question: string;
      required: boolean;
      type: "LONG_TEXT";
      value: string | null; // 장문 답변
    };

/** detail 응답에서 answers 배열 꺼내기(키 명이 달라도 커버) */
const extractAnswers = (detail: any): any[] =>
  (Array.isArray(detail?.answers) && detail.answers) ||
  (Array.isArray(detail?.step2Answers) && detail.step2Answers) ||
  [];

/** 답변에서 해당 질문 id와 매칭 (서버가 recruitFormId 또는 questionId를 쓸 수 있음) */
const findAnswerByQuestionId = (answers: any[], qid: number) =>
  answers.find((a) => a?.recruitFormId === qid || a?.questionId === qid);

/** 체크박스: 선택 라벨 정리 (라벨리스트가 없어도 값 그대로 표시) */
const resolveCheckedValues = (ans: any): string[] =>
  (Array.isArray(ans?.checkedChoices) && ans.checkedChoices) || [];

/** 기타 텍스트 추출(백 구현에 따라 위치가 다를 수 있어 대비) */
const resolveEtcText = (ans: any): string | null => {
  // 1) 체크박스에서도 answer 필드에 기타를 넣어줄 수 있음
  if (typeof ans?.answer === "string" && ans.answer.trim().length > 0) {
    return ans.answer;
  }
  // 2) 혹시 etcText라는 필드를 쓸 수 있음
  if (typeof ans?.etcText === "string" && ans.etcText.trim().length > 0) {
    return ans.etcText;
  }
  return null;
};

/** 장문 텍스트 추출 */
const resolveLongText = (ans: any): string | null => {
  if (typeof ans?.answer === "string") return ans.answer;
  return null;
};

/** 최종 매핑 */
export const mapStep2ToView = (
  questions: ApiQuestion[] = [],
  detail: any
): QAViewItem[] => {
  const answers = extractAnswers(detail);

  return questions.map((q) => {
    const ans = findAnswerByQuestionId(answers, q.id);
    const required = q.required === 1;

    if (q.questionType === QUESTION_TYPE.CHECKBOX) {
      const values = resolveCheckedValues(ans);
      const etcText = q.isEtc === 1 ? resolveEtcText(ans) : null;

      return {
        id: q.id,
        question: q.question,
        required,
        type: "CHECKBOX" as const,
        values,
        etcText,
      };
    }

    // LONG_TEXT
    return {
      id: q.id,
      question: q.question,
      required,
      type: "LONG_TEXT" as const,
      value: resolveLongText(ans),
    };
  });
};
