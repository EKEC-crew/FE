interface TitleInputProps {
  title?: string;
  setTitle?: (title: string) => void;
}

const TitleInput = ({ title = "", setTitle }: TitleInputProps) => {
  return (
    <>
      <div className="font-bold mb-2">
        제목 입력<span className="text-red-500 text-base">*</span>
      </div>
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle?.(e.target.value)}
        className="w-full border border-[#5e6068] p-2 rounded mb-4"
      />
    </>
  );
};

export default TitleInput;
