interface ScheduleFeeSectionProps {
  hasFee: boolean;
  fee?: number | null;
  feePurpose?: string | null;
}

const ScheduleFeeSection = ({
  hasFee,
  fee,
  feePurpose,
}: ScheduleFeeSectionProps) => {
  const amount = hasFee ? (fee ?? 0) : 0;
  const purpose = hasFee ? feePurpose || "미기재" : "회비 없음";

  return (
    <div className="bg-[#F7F8FC] p-5 rounded-2xl">
      {/* 상단 타이틀/서브 */}
      <div className="mb-3">
        <div className="text-sm text-gray-900 font-semibold">
          신청 회비 금액
        </div>
        <div className="mt-1 text-xs text-gray-500 flex gap-2">
          <span className="shrink-0">사용 목적</span>
          <span className="text-gray-700">{purpose}</span>
        </div>
      </div>

      {/* 금액 입력창 (읽기 전용) */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">
          ₩
        </span>
        <input
          type="text"
          readOnly
          aria-readonly
          value={amount.toLocaleString()}
          className="w-full h-12 rounded-lg border border-gray-200 bg-white
                     pl-8 pr-3 text-base text-gray-900 font-medium
                     focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200
                     read-only:cursor-default"
        />
      </div>
    </div>
  );
};

export default ScheduleFeeSection;
