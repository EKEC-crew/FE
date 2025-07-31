import { useState } from "react";
import QuestionItem from "./QuestionItem";

export interface QuestionData {
  id: number;
  type: "checkbox" | "long";
  question: string;
  options: string[];
  required: boolean;
}

const CrewApplicationStep = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: Date.now(),
      type: "checkbox",
      question: "",
      options: ["", ""], // checkbox형일 경우 항목 2개 기본값
      required: true,
    },
  ]);

  // 질문 추가
  const handleAddQuestion = (index: number) => {
    const newQuestion: QuestionData = {
      id: Date.now() + Math.random(),
      type: "checkbox",
      question: "",
      options: ["", ""],
      required: true,
    };
    const newList = [...questions];
    newList.splice(index + 1, 0, newQuestion);
    setQuestions(newList);
  };

  // 질문 삭제
  const handleDeleteQuestion = (index: number) => {
    const newList = questions.filter((_, i) => i !== index);
    setQuestions(newList);
  };

  const isValid = questions.every((q) => {
    if (!q.question.trim()) return false;
    if (q.type === "checkbox") {
      const hasValidOption = q.options.some((opt) => opt.trim());
      return hasValidOption;
    }
    return true; // long 타입은 질문만 있어도 OK
  });

  return (
    <div>
      {/* 상단글 */}
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-[1.375rem] text-[#2B2C31] pb-2">
            크루원 모집 시 상단 글
          </label>
          <span className="text-[#FF4949] text-lg font-normal pb-2">
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
        <label className="font-semibold text-[1.375rem] text-[#2B2C31] pb-2">
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
            data={q}
            onChange={(newData) => {
              const updated = [...questions];
              updated[index] = newData;
              setQuestions(updated);
            }}
            onDelete={() => handleDeleteQuestion(index)}
            onAdd={() => handleAddQuestion(index)}
            totalCount={questions.length}
          />
        ))}
      </div>
      {/* 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button
          className={`w-full h-17 text-xl font-semibold rounded-lg cursor-pointer 
            ${
              isValid
                ? "bg-[linear-gradient(160deg,#72EDF2_0%,#63BCEC_30%,#3A3ADB_70%,#3A3ADB_100%)] text-white cursor-pointer"
                : "bg-[#93959D] text-white cursor-not-allowed"
            }`}
        >
          크루 생성 완료하기
        </button>
      </div>
    </div>
  );
};

export default CrewApplicationStep;
