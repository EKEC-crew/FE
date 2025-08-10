// src/components/apply/CustomQuestionsForm.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionItem from "./CustomQustionItem"; // ← 파일명/경로 확인!

import {
  QUESTION_TYPE,
  type ApiQuestion,
  makeStep2Schema,
  makeStep2Defaults,
  toStep2Payload,
  type Step2FormValues,
} from "../../schemas/apply/Step2";

// 부모와의 타입 합의
type SubmitAnswer =
  | { recruitFormId: number; checkedChoices: string[]; answer?: never }
  | { recruitFormId: number; answer: string; checkedChoices?: never };

type Props = {
  questions: ApiQuestion[];
  onChange: (answers: SubmitAnswer[]) => void;
  /** (선택) 필수 검증 결과가 바뀔 때 알려줄 콜백 */
  onValidateChange?: (ok: boolean, message?: string) => void;
};

const ETC_LABEL = "기타";

export default function CustomQuestionsForm({
  questions,
  onChange,
  onValidateChange,
}: Props) {
  // Zod 스키마 & 기본값 (질문 배열이 바뀔 때만 재생성)
  const schema = useMemo(() => makeStep2Schema(questions), [questions]);
  const defaults = useMemo(() => makeStep2Defaults(questions), [questions]);

  // RHF 세팅
  const {
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  // 질문 변경 시 폼 리셋 (한 번만)
  useEffect(() => {
    reset(defaults, { keepDirty: false, keepTouched: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // UX용: "기타" 입력창 열림 상태
  const [etcOpen, setEtcOpen] = useState<Record<number, boolean>>({});
  useEffect(() => {
    setEtcOpen({});
  }, [questions]);

  // RHF 전체 값
  const values = watch();

  // 🔒 무한 렌더링 방지: 마지막으로 보낸 값/상태를 기억
  const lastPayloadRef = useRef<string>("");
  const lastValidRef = useRef<boolean | null>(null);
  const lastMsgRef = useRef<string | undefined>(undefined);

  // 부모에 payload/유효성 전달 (변화가 있을 때만 호출)
  useEffect(() => {
    const payload = toStep2Payload(questions, values) as SubmitAnswer[];
    const payloadStr = JSON.stringify(payload);

    if (payloadStr !== lastPayloadRef.current) {
      lastPayloadRef.current = payloadStr;
      onChange(payload); // ✅ payload 바뀔 때만 호출
    }

    const firstMsg = getFirstErrorMessage(errors);
    if (isValid !== lastValidRef.current || firstMsg !== lastMsgRef.current) {
      lastValidRef.current = isValid;
      lastMsgRef.current = firstMsg;
      onValidateChange?.(isValid, firstMsg);
    }
  }, [values, errors, isValid, questions, onChange, onValidateChange]);

  // 옵션 목록(+ 기타 라벨 추가)
  const getOptions = (q: ApiQuestion): string[] => {
    const base = ((q.choiceList as any)?.list ?? []) as string[];
    return q.questionType === QUESTION_TYPE.CHECKBOX && q.isEtc === 1
      ? [...base, ETC_LABEL]
      : base;
  };

  // 체크박스 토글
  const toggleCheckbox = (qid: number, label: string, nextChecked: boolean) => {
    const key = String(qid);
    const cur = values[key] as any;
    const curVals: string[] = cur?.values ?? [];

    if (label === ETC_LABEL) {
      // 기타 토글 → etcOpen만 제어, 실제 텍스트는 별도 textarea에서 관리
      setEtcOpen((prev) => {
        const wasOpen = !!prev[qid];
        const next = { ...prev, [qid]: nextChecked ? true : false };
        // 닫힐 때 etc 텍스트 초기화
        if (wasOpen && !nextChecked) {
          setValue(
            key,
            {
              ...(cur ?? { type: QUESTION_TYPE.CHECKBOX, values: [] }),
              etc: "",
            },
            { shouldValidate: true, shouldDirty: true }
          );
        }
        return next;
      });
      return;
    }

    const nextValues = nextChecked
      ? Array.from(new Set([...(curVals ?? []), label]))
      : (curVals ?? []).filter((v) => v !== label);

    setValue(
      key,
      { ...(cur ?? { type: QUESTION_TYPE.CHECKBOX }), values: nextValues },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  // 장문형 입력
  const setText = (qid: number, text: string) => {
    const key = String(qid);
    setValue(
      key,
      { type: QUESTION_TYPE.LONG_TEXT, value: text },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  // 기타 텍스트 입력
  const setEtcText = (qid: number, text: string) => {
    const key = String(qid);
    const cur = values[key] as any;
    setValue(
      key,
      { ...(cur ?? { type: QUESTION_TYPE.CHECKBOX, values: [] }), etc: text },
      { shouldValidate: true, shouldDirty: true }
    );
  };

  return (
    <div className="space-y-6">
      {questions.map((q, index) => {
        const key = String(q.id);
        const opts = getOptions(q);
        const cur = values[key] as any;

        const selectedForItem =
          q.questionType === QUESTION_TYPE.CHECKBOX
            ? (cur?.values ?? [])
            : (cur?.value ?? "");

        const showEtc =
          q.questionType === QUESTION_TYPE.CHECKBOX &&
          q.isEtc === 1 &&
          (etcOpen[q.id] ?? false);

        const err = (errors as any)[key];

        return (
          <div key={q.id} className="space-y-2">
            <QuestionItem
              order={index + 1}
              q={q}
              options={opts}
              selected={selectedForItem}
              onToggleCheckbox={(label, next) =>
                toggleCheckbox(q.id, label, next)
              }
              onTextInput={(text) => setText(q.id, text)}
            />

            {showEtc && (
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                placeholder="기타 내용을 입력해주세요"
                value={cur?.etc ?? ""}
                onChange={(e) => setEtcText(q.id, e.target.value)}
              />
            )}

            {/* Zod/RHF 에러 메시지 */}
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

/** RHF 에러 객체에서 첫 번째 메시지 하나만 추출 */
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
