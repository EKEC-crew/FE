import HeadcountDropdown from "./HeadcountDropdown";
import checkedIcon from "../../assets/icons/ic_check_pressed.svg";
import uncheckedIcon from "../../assets/icons/ic_check_de.svg";

interface HeadcountSectionProps {
  headcount: number | null;
  isUnlimited: boolean;
  onHeadcountChange: (count: number | null) => void;
  onToggleUnlimited: () => void;
}

const HeadcountSection = ({
  headcount,
  isUnlimited,
  onHeadcountChange,
  onToggleUnlimited,
}: HeadcountSectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <label htmlFor="crewSize" className="font-semibold text-[1.375rem] pb-2">
        모집 인원<span className="text-[#FF4949]">*</span>
      </label>
      <div className="flex items-center gap-4 pb-2">
        <label className="text-[1.375rem] font-semibold whitespace-nowrap">
          최대
        </label>
        <HeadcountDropdown
          value={headcount}
          onChange={onHeadcountChange}
          disabled={isUnlimited}
        />
      </div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={onToggleUnlimited}
      >
        <img
          src={isUnlimited ? checkedIcon : uncheckedIcon}
          alt="인원 제한 없음"
        />
        <span className="text-xl font-medium text-[#5E6068]">
          인원 제한 없음
        </span>
      </div>
    </div>
  );
};

export default HeadcountSection;
