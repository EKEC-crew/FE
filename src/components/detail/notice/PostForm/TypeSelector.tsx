const TypeSelector = () => {
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
            defaultChecked
            className="w-4 h-4 appearance-none rounded-full border-1 border-gray-300 
              checked:border-[#B8B8F8] checked:bg-[#3A3ADB] 
              checked:shadow-[0_0_0_4px_#B8B8F8]" 
          />
          <div className="text-lg">정기모임</div>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="regular"
            defaultChecked
            className="w-4 h-4 appearance-none rounded-full border-1 border-gray-300 
              checked:border-[#B8B8F8] checked:bg-[#3A3ADB] 
              checked:shadow-[0_0_0_4px_#B8B8F8]"
          />
          <div className="text-lg">번개 모임</div>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="type"
            value="required"
            defaultChecked
            className="w-5 h-5 appearance-none rounded-sm border-2 border-[#3A3ADB]
             checked:bg-[#ffffff] checked:border-[#3A3ADB] 
             checked:bg-check bg-center bg-no-repeat"
          />
          필참 여부
        </label>
      </div>
    </div>
  );
};

export default TypeSelector;
