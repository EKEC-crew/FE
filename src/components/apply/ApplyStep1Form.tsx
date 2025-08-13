// src/components/apply/CustomQuestionsForm.tsx
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionItem from "./ApplyStep2Item";

import {
  QUESTION_TYPE,
  type ApiQuestion,
  makeStep2Schema,
  makeStep2Defaults,
  toStep2Payload,
  type Step2FormValues,
} from "../../schemas/apply/Step2";

// 부모로 넘길 제출 타입
type SubmitAnswer =
  | { recruitFormId: number; checkedChoices: string[]; answer?: never }
  | { recruitFormId: number; answer: string; checkedChoices?: never };

type Props = {
  questions: ApiQuestion[]; // 서버에서 받은 질문 목록
  onChange: (answers: SubmitAnswer[]) => void; // 값이 바뀔 때마다 호출
  onValidateChange?: (ok: boolean, message?: string) => void; // 유효성 결과 변경 시 호출
  disabled?: boolean; // ✅ 읽기 전용 모드
  value?: SubmitAnswer[]; // ✅ 외부에서 답변 주입 (조회용)
};

export default function CustomQuestionsForm({
  questions,
  onChange,
  onValidateChange,
}: Props) {
  /* -----------------------------
   * 1. Zod 스키마 & 기본값 세팅
   * ---------------------------*/
  const schema = useMemo(() => makeStep2Schema(questions), [questions]); // 질문 배열 기반 검증 스키마
  const defaults = useMemo(() => makeStep2Defaults(questions), [questions]); // 질문 배열 기반 기본값

  /* -----------------------------
   * 2. RHF 폼 설정
   * ---------------------------*/
  const {
    watch, // 폼 전체 값 구독
    setValue, // 특정 값 업데이트
    reset, // 폼 초기화
    formState: { errors, isValid },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(schema), // Zod와 연결
    mode: "onChange", // 값 변경 시 즉시 검증
    defaultValues: defaults, // 초기값
  });

  // 질문이 바뀌면 폼 전체를 새 defaults로 리셋
  useEffect(() => {
    reset(defaults, { keepDirty: false, keepTouched: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  /* -----------------------------
   * 3. 값 변경/유효성 변경 감지 후 부모로 전달
   * ---------------------------*/
  const values = watch(); // 현재 폼 전체 값
  const lastPayloadRef = useRef<string>(""); // 마지막 전송값(중복 호출 방지)
  const lastValidRef = useRef<boolean | null>(null); // 마지막 유효성 상태
  const lastMsgRef = useRef<string | undefined>(undefined); // 마지막 에러 메시지

  useEffect(() => {
    // RHF 값 → 서버 전송 형식으로 변환
    const payload = toStep2Payload(questions, values) as SubmitAnswer[];
    const payloadStr = JSON.stringify(payload);

    // 값이 바뀌었으면 부모로 전달
    if (payloadStr !== lastPayloadRef.current) {
      lastPayloadRef.current = payloadStr;
      onChange(payload);
    }

    // 첫 번째 에러 메시지 추출
    const firstMsg = getFirstErrorMessage(errors as any);

    // 유효성 상태나 메시지가 바뀌면 부모로 전달
    if (isValid !== lastValidRef.current || firstMsg !== lastMsgRef.current) {
      lastValidRef.current = isValid;
      lastMsgRef.current = firstMsg;
      onValidateChange?.(isValid, firstMsg);
    }
  }, [values, errors, isValid, questions, onChange, onValidateChange]);

  /* -----------------------------
   * 4. 질문별 옵션 추출
   *    - 여기선 "기타" 안 붙이고 베이스만 반환
   * ---------------------------*/
  const getOptions = (q: ApiQuestion): string[] =>
    ((q.choiceList as any)?.list ?? []) as string[];

  /* -----------------------------
   * 5. 렌더링
   * ---------------------------*/
  return (
    <div className="space-y-6">
      {/* 질문 목록 렌더 */}
      {questions.map((q, index) => {
        const key = String(q.id);
        const opts = getOptions(q); // 해당 질문의 선택지
        const cur = values[key] as any; // 해당 질문의 현재 값

        // CHECKBOX면 배열, LONG_TEXT면 문자열
        const selectedForItem =
          q.questionType === QUESTION_TYPE.CHECKBOX
            ? (cur?.values ?? [])
            : (cur?.value ?? "");

        // 기타 입력 가능 여부
        const showEtcState =
          q.questionType === QUESTION_TYPE.CHECKBOX && q.isEtc === 1;

        // 해당 질문의 에러 객체
        const err = (errors as any)[key];

        return (
          <div key={q.id} className="space-y-2">
            {/* 개별 질문 컴포넌트 */}
            <QuestionItem
              order={index + 1}
              q={q}
              options={opts}
              selected={selectedForItem}
              etcText={cur?.etc ?? ""} // RHF에서 관리되는 기타 입력값
              onCheckboxChange={(next) => {
                setValue(
                  key,
                  {
                    ...(cur ?? { type: QUESTION_TYPE.CHECKBOX, values: [] }),
                    values: next,
                  },
                  { shouldValidate: true, shouldDirty: true }
                );
              }}
              onEtcTextChange={(text) => {
                if (!showEtcState) return; // 기타 사용 안 하는 질문이면 무시
                setValue(
                  key,
                  {
                    ...(cur ?? { type: QUESTION_TYPE.CHECKBOX, values: [] }),
                    etc: text,
                  },
                  { shouldValidate: true, shouldDirty: true }
                );
              }}
              onTextInput={(text) =>
                setValue(
                  key,
                  { type: QUESTION_TYPE.LONG_TEXT, value: text },
                  { shouldValidate: true, shouldDirty: true }
                )
              }
            />

            {/* 에러 메시지 표시 */}
            {err && (
              <div className="mt-1 text-sm text-red-600">
                {err.values?.message || err.value?.message || err.message}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* -----------------------------
 * 6. 첫 번째 에러 메시지 추출 함수
 * ---------------------------*/
function getFirstErrorMessage(
  errors: Record<string, any> | undefined
): string | undefined {
  if (!errors) return undefined;
  for (const key of Object.keys(errors)) {
    const e = (errors as any)[key];
    const m = e?.values?.message || e?.value?.message || e?.message;
    if (typeof m === "string" && m.trim()) return m;
  }
  return undefined;
}
