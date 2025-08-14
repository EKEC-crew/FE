const TypeSelector = ({
  type,
  setType,
}: {
  type: string;
  setType: (v: string) => void;
  isRequired: boolean;
  setIsRequired: (v: boolean) => void;
}) => {
  return (
    <div className="mb-4">
      <label className="block font-large mb-1 font-bold">
        유형 선택
        <span className="text-red-500 text-xl">*</span>
      </label>
      <div className="flex gap-4 p-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="regular"
            checked={type === "regular"}
            onChange={(e) => setType(e.target.value)}
            className="w-4 h-4 appearance-none rounded-full border-1 border-gray-300 checked:border-[#B8B8F8] checked:bg-[#3A3ADB] checked:shadow-[0_0_0_4px_#B8B8F8]"
          />
          <div className="text-lg">게시글 작성</div>
        </label>
      </div>
    </div>
  );
};

export default TypeSelector;
