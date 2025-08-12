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

const ETC_LABEL = "기타"; // 체크표시용으로 values에 들어가는 라벨(서버 전송시 제거)

const canon = (v: unknown) =>
  String(v ?? "")
    .normalize("NFC")
    .replace(/\u200B/g, "") // zero-width space 제거
    .trim();

/* ------------------------------------------------
 * Schemas
 * ----------------------------------------------*/
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
        (v.values ?? []).map(canon).filter((s) => s.length > 0).length > 0;
      const hasEtcText = etcEnabled ? canon(v.etc).length > 0 : false;
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

  return base.refine((v) => canon(v.value).length > 0, {
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

/* ------------------------------------------------
 * Defaults
 * ----------------------------------------------*/
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

/* ------------------------------------------------
 * Payload builder
 * ----------------------------------------------*/
// ✅ 항상 필드를 포함해서 반환 (선택 문항도: 체크박스 → [], 장문 → "")
export function toStep2Payload(
  questions: ApiQuestion[],
  values: Step2FormValues
) {
  return questions.map((q) => {
    const key = String(q.id);
    const v = values[key] as AnswerValue;

    if (q.questionType === QUESTION_TYPE.CHECKBOX) {
      const raw = (v as CheckboxAnswer)?.values ?? [];

      // 1) values에서 "기타" 라벨은 제거 (체크표시용이었을 뿐, 서버엔 보내지 않음)
      const base = raw
        .map(canon)
        .filter((s) => s.length > 0 && s !== ETC_LABEL);

      // 2) etc 텍스트가 있으면 choices에 추가
      const etcText = q.isEtc === 1 ? canon((v as CheckboxAnswer)?.etc) : "";
      const checkedChoices = etcText ? [...base, etcText] : base;

      return {
        recruitFormId: q.id,
        checkedChoices, // 비필수면 []로 감
      };
    } else {
      const answer = canon((v as LongTextAnswer)?.value);
      return {
        recruitFormId: q.id,
        answer, // 비필수면 ""로 감 (상위에서 null 변환 필요시 거기서 처리)
      };
    }
  });
}
