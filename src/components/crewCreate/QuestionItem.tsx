import { useState } from "react";
import uncheckedIcon from "../../assets/icons/ic_check_de.svg";
import deleteIcon from "../../assets/icons/ic_trash_ arrow.svg";
import addIcon from "../../assets/icons/ic_circleplus_ arrow.svg";
import dismissIcon from "../../assets/icons/ic_dissmiss_28.svg";
import radioPressedIcon from "../../assets/icons/ic_radio_pressed.svg";
import radioDeIcon from "../../assets/icons/ic_radio_de.svg";

interface QuestionItemProps {
  index: number;
  onDelete: () => void;
  onAdd: () => void;
}

const QuestionItem = ({ index, onDelete, onAdd }: QuestionItemProps) => {
  const [questionType, setQuestionType] = useState<"checkbox" | "long">(
    "checkbox"
  );
  const [options, setOptions] = useState(["", ""]);
  const [isRequired, setIsRequired] = useState(true);

  const handleOptionChange = (i: number, value: string) => {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (i: number) =>
    setOptions(options.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-4 p-8 bg-[#F7F7FB] rounded-lg">
      <div className="flex gap-8">
        {/* 질문 입력 */}
        <div className="flex items-center gap-4 flex-1">
          <span className="font-semibold text-[26px] text-[#2B2C31]">
            {index + 1}.
          </span>
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="placeholder:text-[#93959D] placeholder:font-medium placeholder:text-[20px] text-[20px] font-medium border-[2px] border-[#D9DADD] bg-white w-full p-4 rounded-lg focus:outline-none"
          />
        </div>

        {/* 라디오 버튼 - 체크박스형/장문형 선택 */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setQuestionType("checkbox")}
          >
            <img
              src={questionType === "checkbox" ? radioPressedIcon : radioDeIcon}
              alt="checkbox type"
              className="w-[26px] h-[26px]"
            />
            <span className="text-[#93959D] text-[20px] font-medium">
              체크박스
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setQuestionType("long")}
          >
            <img
              src={questionType === "long" ? radioPressedIcon : radioDeIcon}
              alt="long type"
              className="w-[26px] h-[26px]"
            />
            <span className="text-[#93959D] text-[20px] font-medium">
              장문형
            </span>
          </div>
        </div>
      </div>

      {/* 조건부 렌더링 영역 */}
      {questionType === "checkbox" ? (
        <div className="flex flex-col gap-4">
          {options.map((opt, i) => (
            <div key={i} className="relative w-full">
              <img
                src={uncheckedIcon}
                alt="checkbox"
                className="absolute left-0 translate-y-1/3"
              />
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`항목 ${i + 1}을 입력해주세요`}
                className="w-full pl-10 pr-8 border-b-[2px] border-[#D9DADD] py-2 text-[18px] placeholder-[#93959D] placeholder:text-[18px] placeholder:font-normal focus:outline-none"
              />
              <img
                src={dismissIcon}
                alt="remove"
                className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => removeOption(i)}
              />
            </div>
          ))}

          {/* 항목 추가 / 기타 추가 */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={addOption}
              className="h-10 px-4 bg-[#3A3ADB] text-white text-[20px] font-normal rounded-full"
            >
              항목추가
            </button>
            <button className="h-10 px-4 bg-[#C5C6CB] text-black text-[20px] font-normal rounded-full">
              기타추가
            </button>
          </div>
        </div>
      ) : (
        <input
          type="text"
          placeholder="세부 내용을 입력해주세요"
          className="w-full border-b-[2px] border-[#D9DADD] py-1 text-[18px] placeholder-[#93959D] placeholder:text-[18px] placeholder:font-normal focus:outline-none"
        />
      )}

      {/* 공통 하단 영역 */}
      <div className="flex items-center gap-4 mt-4">
        {/* 답변 필수 토글 스위치 */}
        <span className="text-[20px] font-medium text-[#2B2C31]">
          답변 필수
        </span>
        <div
          className={`w-10 h-6 rounded-full cursor-pointer ${
            isRequired ? "bg-[#3A3ADB]" : "bg-[#D9DADD]"
          }`}
          onClick={() => setIsRequired(!isRequired)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full mt-1 transition-all ${
              isRequired ? "ml-5" : "ml-1"
            }`}
          />
        </div>
        {/* 세로 구분선 */}
        <div className="w-[2px] h-6 bg-[#93959D]" />

        <img
          src={deleteIcon}
          alt="삭제"
          className="cursor-pointer"
          onClick={onDelete}
        />
        <img
          src={addIcon}
          alt="추가"
          className="cursor-pointer"
          onClick={onAdd}
        />
      </div>
    </div>
  );
};

export default QuestionItem;
