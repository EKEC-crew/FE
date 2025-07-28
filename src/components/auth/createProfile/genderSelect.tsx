import man from "../../../assets/icons/createProfile/man.svg";
import woman from "../../../assets/icons/createProfile/woman.svg";
import checkBoxIcon from "../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../assets/icons/ic_check_pressed.svg";

interface GenderSelectProps {
  selectedGender: string;
  onGenderChange: (gender: "male" | "female" | "not-defined") => void;
  isNotDefine: boolean;
  onNotDefineChange: (isNotDefine: boolean) => void;
  disabled?: boolean; // 남/여 버튼 제어
  notDefineDisabled?: boolean; // 밝히지 않음 버튼 제어
  originalGender?: "male" | "female" | "not-defined";
  buttonWidth?: string;
  buttonHeight?: string;
  checkBoxWidth?: string;
}

const GenderSelect = ({
  selectedGender,
  onGenderChange,
  isNotDefine,
  onNotDefineChange,
  disabled = false,
  notDefineDisabled = false,
  originalGender,
  buttonWidth = "13.02vw",
  buttonHeight = "4.63vh",
  checkBoxWidth = "27.08vw",
}: GenderSelectProps) => {
  // 밝히지 않음 클릭 로직
  const handleNotDefineClick = () => {
    if (notDefineDisabled) return; // 비활성화 시 클릭 막기

    if (isNotDefine) {
      // 다시 누르면 원래 성별로 돌아가기
      if (originalGender) {
        onGenderChange(originalGender);
        onNotDefineChange(false);
      }
    } else {
      onGenderChange("not-defined");
      onNotDefineChange(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 성별 버튼 */}
      <div
        className="flex justify-center items-center mb-4"
        style={{ gap: "1.04vw" }}
      >
        {/* 남성 */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => onGenderChange("male")}
          className={`flex items-center justify-center border-2 rounded-[50px] transition-all duration-200 ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-400"
              : "hover:opacity-80"
          } ${
            selectedGender === "male"
              ? "border-blue-500 bg-blue-50"
              : "border-stone-300 bg-white"
          }`}
          style={{ width: buttonWidth, height: buttonHeight }}
        >
          <img src={man} alt="남성" className="w-5 h-5" />
          <span className="text-black text-xl font-normal">남성</span>
        </button>

        {/* 여성 */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => onGenderChange("female")}
          className={`flex items-center justify-center border-2 rounded-[50px] transition-all duration-200 ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-400"
              : "hover:opacity-80"
          } ${
            selectedGender === "female"
              ? "border-blue-500 bg-blue-50"
              : "border-stone-300 bg-white"
          }`}
          style={{ width: buttonWidth, height: buttonHeight }}
        >
          <img src={woman} alt="여성" className="w-5 h-5" />
          <span className="text-black text-xl font-normal">여성</span>
        </button>
      </div>

      {/* 밝히고 싶지 않음 */}
      <div className="flex items-center mb-6" style={{ width: checkBoxWidth }}>
        <button
          type="button"
          disabled={notDefineDisabled}
          onClick={handleNotDefineClick}
          className={`flex items-center select-none ${
            notDefineDisabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative mr-3 flex-shrink-0">
            <img
              src={isNotDefine ? pressedCheckBoxIcon : checkBoxIcon}
              alt={isNotDefine ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <span className="text-sm md:text-base lg:text-xl font-medium text-[#5E6068]">
            밝히고 싶지 않음
          </span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelect;
