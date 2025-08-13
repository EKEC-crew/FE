// src/components/apply/applyDetail/ApplyStep2Readonly.tsx
import ApplyStepHeader from "../ApplyStepHeader";
import type { QAViewItem } from "../../../utils/apply/mapStep2";

type Props = { items: QAViewItem[] };

export default function ApplyStep2Readonly({ items }: Props) {
  return (
    <section>
      <ApplyStepHeader step={2} title="개별 질문" required />
      <div className="bg-white border rounded-[10px] p-6 flex flex-col gap-6">
        {items.length === 0 ? (
          <div className="text-sm text-gray-500">등록된 질문이 없습니다.</div>
        ) : (
          items.map((it) => <QAItem key={it.id} item={it} />)
        )}
      </div>
    </section>
  );
}

function QAItem({ item }: { item: QAViewItem }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[15px] font-medium">
        {item.question}
        {item.required && (
          <span className="ml-2 text-[#3A3CDB] text-xs">필수</span>
        )}
      </div>

      {item.type === "CHECKBOX" ? (
        <div className="flex flex-wrap gap-2">
          {item.values?.length ? (
            item.values.map((v, idx) => <Badge key={idx} label={v} />)
          ) : (
            <div className="text-sm text-gray-500">선택 없음</div>
          )}
          {item.etcText ? <Badge label={`기타: ${item.etcText}`} /> : null}
        </div>
      ) : (
        <div className="text-[15px] bg-[#F7F7FB] rounded-md p-3 whitespace-pre-wrap">
          {item.value?.trim() ? (
            item.value
          ) : (
            <span className="text-gray-500">내용 없음</span>
          )}
        </div>
      )}
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="text-[13px] px-2 py-1 rounded-md border bg-[#F7F7FB]">
      {label}
    </span>
  );
}
