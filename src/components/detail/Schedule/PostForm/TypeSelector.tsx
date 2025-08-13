import checkBoxIcon from "../../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../../assets/icons/ic_check_pressed.svg";

const TypeSelector = ({
  type,
  setType,
  isRequired,
  setIsRequired,
}: {
  type: string;
  setType: (v: string) => void;
  isRequired: boolean;
  setIsRequired: (v: boolean) => void;
}) => {
  const handleRequiredToggle = () => {
    setIsRequired(!isRequired);
  };

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
          <div className="text-lg">정기모임</div>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="type"
            value="lightning"
            checked={type === "lightning"}
            onChange={(e) => setType(e.target.value)}
            className="w-4 h-4 appearance-none rounded-full border-1 border-gray-300 checked:border-[#B8B8F8] checked:bg-[#3A3ADB] checked:shadow-[0_0_0_4px_#B8B8F8]"
          />
          <div className="text-lg">번개 모임</div>
        </label>

        {/* 필참 여부 체크박스 - 이미지 방식으로 변경 */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleRequiredToggle}
        >
          <div className="w-5 h-5 relative flex-shrink-0">
            <img
              src={isRequired ? pressedCheckBoxIcon : checkBoxIcon}
              alt={isRequired ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <div className="text-lg">필참 여부</div>
        </div>
      </div>
    </div>
  );
};

export default TypeSelector;
