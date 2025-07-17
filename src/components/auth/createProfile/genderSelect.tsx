import man from "../../../assets/icons/createProfile/man.svg";
import woman from "../../../assets/icons/createProfile/woman.svg";
import checkBoxIcon from "../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../assets/icons/ic_check_pressed.svg";

interface GenderSelectProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  isNotDefine: boolean;
  onNotDefineChange: (isNotDefine: boolean) => void;
}

const GenderSelect = ({
  selectedGender,
  onGenderChange,
  isNotDefine,
  onNotDefineChange,
}: GenderSelectProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 성별 라벨 - 왼쪽 정렬 */}
      <div className="mb-2" style={{ width: "27.08vw" }}>
        <span className="text-zinc-800 text-xl font-semibold">성별</span>
        <span className="text-red-500 text-xl font-semibold">*</span>
      </div>

      {/* 성별 선택 버튼들 */}
      <div
        className="flex justify-center items-center mb-4"
        style={{ gap: "1.04vw" }} // 20px = 1.04vw (1920*1080 기준)
      >
        {/* 남성 버튼 */}
        <button
          onClick={() => onGenderChange("male")}
          className={`flex items-center justify-center border-2 rounded-[50px] transition-all duration-200 hover:opacity-80 ${
            selectedGender === "male"
              ? "border-blue-500 bg-blue-50"
              : "border-stone-300 bg-white"
          }`}
          style={{
            width: "13.02vw", // 250px = 13.02vw (1920*1080 기준)
            height: "4.63vh", // 50px = 4.63vh (1920*1080 기준)
            gap: "0.52vw", // 10px = 0.52vw (1920*1080 기준)
          }}
        >
          <img src={man} alt="남성" className="w-5 h-5" />
          <span className="text-black text-xl font-normal font-['Pretendard']">
            남성
          </span>
        </button>

        {/* 여성 버튼 */}
        <button
          onClick={() => onGenderChange("female")}
          className={`flex items-center justify-center border-2 rounded-[50px] transition-all duration-200 hover:opacity-80 ${
            selectedGender === "female"
              ? "border-blue-500 bg-blue-50"
              : "border-stone-300 bg-white"
          }`}
          style={{
            width: "13.02vw", // 250px = 13.02vw (1920*1080 기준)
            height: "4.63vh", // 50px = 4.63vh (1920*1080 기준)
            gap: "0.52vw", // 10px = 0.52vw (1920*1080 기준)
          }}
        >
          <img src={woman} alt="여성" className="w-5 h-5" />
          <span className="text-black text-xl font-normal font-['Pretendard']">
            여성
          </span>
        </button>
      </div>

      {/* 밝히고 싶지 않음 체크박스 */}
      <div className="flex items-center mb-6" style={{ width: "27.08vw" }}>
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={() => onNotDefineChange(!isNotDefine)}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative mr-3 flex-shrink-0">
            <img
              src={isNotDefine ? pressedCheckBoxIcon : checkBoxIcon}
              alt={isNotDefine ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <div
            className="text-sm md:text-base lg:text-xl font-medium"
            style={{ color: "#5E6068" }}
          >
            밝히고 싶지 않음
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderSelect;
