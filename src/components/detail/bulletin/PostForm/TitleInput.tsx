import { useState, useEffect } from "react";

interface TitleInputProps {
  onValueChange?: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ onValueChange }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    onValueChange?.(title);
  }, [title, onValueChange]);

  return (
    <>
      <div className="font-bold mb-2">
        제목 입력<span className="text-red-500 text-base">*</span>
      </div>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        className="w-full border border-[#5e6068] p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </>
  );
};

export default TitleInput;
