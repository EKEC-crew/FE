import checkedIcon from "../../assets/icons/ic_check_pressed.svg";
import uncheckedIcon from "../../assets/icons/ic_check_de.svg";
import SingleSelectDropdown from "../crewList/SingleSelectDropdown";
import GenderSelect from "../crewFilter/GenderSelect";
import { ageGroupOptions } from "../../constants/crewFilterOptions";

interface QualificationSectionProps {
  age: number | null;
  onAgeChange: (age: number) => void;
  gender: number | null;
  onGenderChange: (gender: number | null) => void;
  isGenderUnlimited: boolean;
  toggleGenderUnlimited: () => void;
}

const QualificationSection = ({
  age,
  onAgeChange,
  gender,
  onGenderChange,
  isGenderUnlimited,
  toggleGenderUnlimited,
}: QualificationSectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <label className="font-semibold text-[1.375rem] pb-2">자격</label>
      <div className="flex flex-wrap gap-8 items-center">
        {/* 연령대 */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[1.375rem] text-[#2B2C31]">
            연령대
          </span>
          <SingleSelectDropdown<number>
            label="00대"
            options={ageGroupOptions}
            selected={age}
            onSelect={onAgeChange}
            variant="filter"
          />
        </div>
        {/* 성별 */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[1.375rem] text-[#2B2C31]">
            성별
          </span>
          <GenderSelect
            value={gender}
            onChange={onGenderChange}
            disabled={isGenderUnlimited}
          />
        </div>
        {/* 성별 제한 없음 */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleGenderUnlimited}
        >
          <img
            src={isGenderUnlimited ? checkedIcon : uncheckedIcon}
            alt="성별 제한 없음"
          />
          <span className="text-xl font-medium text-[#5E6068]">
            성별 제한 없음
          </span>
        </div>
      </div>
    </div>
  );
};

export default QualificationSection;
