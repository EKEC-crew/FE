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
    <input 
      type="text"
      placeholder="제목을 입력해주세요"
      className="w-full border border-[#5e6068] p-2 rounded mb-4"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default TitleInput;