import { useState } from "react";
import QuestionItem from "./QuestionItem";

const CrewApplicationStep = () => {
  const [questions, setQuestions] = useState([{ id: Date.now() }]);

  // 질문 추가
  const handleAddQuestion = (index: number) => {
    const newQuestion = { id: Date.now() + Math.random() };
    const newList = [...questions];
    newList.splice(index + 1, 0, newQuestion);
    setQuestions(newList);
  };

  // 질문 삭제
  const handleDeleteQuestion = (index: number) => {
    const newList = questions.filter((_, i) => i !== index);
    setQuestions(newList);
  };

  return (
    <div>
      {/* 상단글 */}
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-[22px] text-[#2B2C31] pb-2">
            크루원 모집 시 상단 글
          </label>
          <span className="text-[#FF4949] text-[18px] font-normal pb-2">
            상단에 안내하고 싶은 말을 작성해주세요
          </span>
        </div>
        <textarea
          placeholder="나의 크루가 어떤 사람을 원하는지, 활동 내용들을 간략히 소개하면 지원율이 높아질 거예요!"
          className="border-[2px] border-[#C5C6CB] focus:border-[#3A3ADB] focus:outline-none placeholder:text-[#93959D] font-medium text-xl p-4 rounded-lg resize-none h-40"
        />
      </div>
      {/* 질문 */}
      <div className="flex flex-col pb-2">
        <label className="font-semibold text-[22px] text-[#2B2C31] pb-2">
          지원자를 더 잘 알기 위한 질문을 입력해주세요
          <span className="text-[#FF4949]">*</span>
        </label>
      </div>
      {/* 질문 박스 */}
      <div className="flex flex-col gap-8">
        {questions.map((q, index) => (
          <QuestionItem
            key={q.id}
            index={index}
            onDelete={() => handleDeleteQuestion(index)}
            onAdd={() => handleAddQuestion(index)}
          />
        ))}
      </div>
      {/* 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button className="w-full h-17 bg-[#93959D] text-[#FFFFFF] text-[20px] font-semibold rounded-lg">
          크루 생성 완료하기
        </button>
      </div>
    </div>
  );
};

export default CrewApplicationStep;
