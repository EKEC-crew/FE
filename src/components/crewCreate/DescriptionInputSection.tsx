interface DescriptionInputSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const DescriptionInputSection = ({
  value,
  onChange,
}: DescriptionInputSectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <label
        htmlFor="crewDescription"
        className="font-semibold text-[22px] pb-2"
      >
        크루 소개글<span className="text-[#FF4949]">*</span>
      </label>
      <input
        id="crewDescription"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="크루를 간단하게 소개해주세요"
        className="border-[2px] border-[#C5C6CB] focus:border-[#3A3ADB] focus:outline-none placeholder:text-[#93959D] font-medium text-xl p-4 rounded-lg"
      />
    </div>
  );
};

export default DescriptionInputSection;
