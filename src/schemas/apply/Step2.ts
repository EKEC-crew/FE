// src/schemas/apply/Step2.ts
import { z } from "zod";

export const QUESTION_TYPE = {
  CHECKBOX: 0,
  LONG_TEXT: 1,
} as const;
export type QuestionType = (typeof QUESTION_TYPE)[keyof typeof QUESTION_TYPE];

export type ApiQuestion = {
  id: number;
  question: string;
  questionType: QuestionType; // 0 | 1
  choiceList: { list?: string[] } | {};
  isEtc: 0 | 1;
  required: 0 | 1;
};

export type CheckboxAnswer = { type: 0; values: string[]; etc?: string };
export type LongTextAnswer = { type: 1; value: string };
export type AnswerValue = CheckboxAnswer | LongTextAnswer;
export type Step2FormValues = Record<string, AnswerValue>;

function checkboxSchema(required: boolean, etcEnabled: boolean) {
  const base = z.object({
    type: z.literal(QUESTION_TYPE.CHECKBOX),
    values: z.array(z.string()).default([]),
    etc: etcEnabled ? z.string().optional() : z.undefined(),
  });

  if (!required) return base;

  return base.refine(
    (v) => {
      const hasValues =
        (v.values ?? []).filter((s) => s.trim().length > 0).length > 0;
      const hasEtcText = etcEnabled ? (v.etc ?? "").trim().length > 0 : false;
      return hasValues || hasEtcText;
    },
    {
      message: etcEnabled
        ? "최소 1개 선택하거나 ‘기타’에 내용을 입력하세요."
        : "최소 1개 이상 선택하세요.",
      path: ["values"],
    }
  );
}

function longTextSchema(required: boolean) {
  const base = z.object({
    type: z.literal(QUESTION_TYPE.LONG_TEXT),
    value: z.string().default(""),
  });

  if (!required) return base;

  return base.refine((v) => v.value.trim().length > 0, {
    message: "이 문항은 필수입니다.",
    path: ["value"],
  });
}

export function makeStep2Schema(questions: ApiQuestion[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const q of questions) {
    const key = String(q.id);
    const required = q.required === 1;
    const etcEnabled = q.isEtc === 1;

    shape[key] =
      q.questionType === QUESTION_TYPE.CHECKBOX
        ? checkboxSchema(required, etcEnabled)
        : longTextSchema(required);
  }

  return z.object(shape);
}

export function makeStep2Defaults(questions: ApiQuestion[]): Step2FormValues {
  const init: Step2FormValues = {};
  for (const q of questions) {
    const key = String(q.id);
    if (q.questionType === QUESTION_TYPE.CHECKBOX) {
      init[key] = { type: 0, values: [], ...(q.isEtc ? { etc: "" } : {}) };
    } else {
      init[key] = { type: 1, value: "" };
    }
  }
  return init;
}

// ✅ 항상 필드를 포함해서 반환 (선택 문항도: 체크박스 → [], 장문 → "")
export function toStep2Payload(
  questions: ApiQuestion[],
  values: Step2FormValues
) {
  return questions.map((q) => {
    const key = String(q.id);
    const v = values[key] as AnswerValue;

    if (q.questionType === QUESTION_TYPE.CHECKBOX) {
      const base = (v as CheckboxAnswer)?.values ?? [];
      const etcText =
        q.isEtc === 1 ? ((v as CheckboxAnswer)?.etc ?? "").trim() : "";
      const checkedChoices = [...base, ...(etcText ? [etcText] : [])];

      return {
        recruitFormId: q.id,
        checkedChoices, // 비필수면 []로 감
      };
    } else {
      const answer = ((v as LongTextAnswer)?.value ?? "").trim();
      return {
        recruitFormId: q.id,
        answer, // 비필수면 ""로 감
      };
    }
  });
}
