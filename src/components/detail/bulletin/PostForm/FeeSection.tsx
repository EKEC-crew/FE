const FeeSection = ({
  fee,
  setFee,
  isFeeRequired,
  setIsFeeRequired,
  feePurpose,
  setFeePurpose,
}: {
  fee: string;
  setFee: (v: string) => void;
  isFeeRequired: boolean;
  setIsFeeRequired: (v: boolean) => void;
  feePurpose: string;
  setFeePurpose: (v: string) => void;
}) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1 p-1">회비 등록</label>
      <div className="relative mb-2">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-bold py-3 pt-3">₩</span>
        <input
          type="text"
          className="w-full border p-2 pl-8 rounded text-sm placeholder-gray-400"
          placeholder="금액을 입력해주세요"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </div>
      <label className="flex items-center gap-2 mb-2 p-1 text-sm">
        <input
          type="checkbox"
          name="fee-required"
          checked={isFeeRequired}
          onChange={(e) => setIsFeeRequired(e.target.checked)}
          className="w-5 h-5 appearance-none rounded-sm border-2 border-[#3A3ADB] checked:bg-[#3A3ADB] checked:border-[#3A3ADB] checked:bg-check bg-center bg-no-repeat"
        />
        회비 등록 여부
      </label>
      <input
        type="text"
        className="w-full border p-2 rounded text-sm placeholder-gray-400"
        placeholder="회비 사용 목적을 입력해주세요"
        value={feePurpose}
        onChange={(e) => setFeePurpose(e.target.value)}
      />
    </div>
  );
};

export default FeeSection;
