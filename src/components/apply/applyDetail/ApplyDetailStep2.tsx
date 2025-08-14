// src/components/apply/Step2ReadonlyRenderer.tsx
import { type ApiQuestion, QUESTION_TYPE } from "../../../types/apply/types";
import { mapStep2ToView } from "../../../utils/apply/mapStep2";
import { useMemo } from "react";
import CustomQuestionItem from "../applyStep2/ApplyStep2Item";

type Props = {
  /** 스텝2 폼 API에서 받은 질문들 */
  questions: ApiQuestion[];
  /** 특정크루·특정지원서 상세 응답(success 객체) */
  detail: any;
};

export default function Step2ReadonlyRenderer({ questions, detail }: Props) {
  const items = useMemo(
    () => mapStep2ToView(questions, detail),
    [questions, detail]
  );

  return (
    <section className="space-y-4">
      {items.map((it, idx) => {
        const q = questions.find((qq) => qq.id === it.id);
        if (!q) return null;

        return (
          <div key={it.id} className="pointer-events-none select-none">
            {it.type === "CHECKBOX" ? (
              <CustomQuestionItem
                order={idx + 1}
                q={q}
                options={
                  Array.isArray((q.choiceList as any)?.list)
                    ? ((q.choiceList as any).list as string[])
                    : []
                }
                selected={it.values} //  체크된 상태로 표시
                etcText={it.etcText ?? undefined} // 기타 textarea 값 채움
                onCheckboxChange={() => {}} // no-op
                onEtcTextChange={() => {}} // no-op
                onTextInput={() => {}} // no-op
              />
            ) : (
              <CustomQuestionItem
                order={idx + 1}
                q={{ ...q, questionType: QUESTION_TYPE.LONG_TEXT }}
                options={[]} // 장문은 옵션 없음
                selected={it.value ?? ""} // textarea에 값 채움
                onCheckboxChange={() => {}}
                onEtcTextChange={() => {}}
                onTextInput={() => {}}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
