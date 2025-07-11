import MultiSelectDropdown from "./MultiSelectDropdown";
import RegionSelectDropdown from "./RegionSelectDropdown";
import SingleSelectDropdown from "./SingleSelectDropdown";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import manIcon from "../../assets/icons/ic_man_28.svg";
import womanIcon from "../../assets/icons/ic_woman_28.svg";
import {
  categoryLabels,
  activityLabels,
  styleLabels,
  regionOptions,
  ageOptions,
} from "./Options.ts";

const genderOptions = [
  { label: "선택 안 함" },
  { label: "남성", icon: <img src={manIcon} alt="남성" /> },
  { label: "여성", icon: <img src={womanIcon} alt="여성" /> },
];

const CrewFilterBar = () => {
  return (
    <div className="flex gap-3 flex-wrap pb-8">
      {/* 새로고침 버튼 */}
      <button className="h-12 w-12 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD]">
        <img src={resetIcon} alt="필터 초기화" />
      </button>
      <MultiSelectDropdown
        label="카테고리"
        options={categoryLabels}
        singleSelect
      />
      <MultiSelectDropdown label="활동" options={activityLabels} />
      <MultiSelectDropdown label="스타일" options={styleLabels} />
      <RegionSelectDropdown label="지역" regions={regionOptions} />
      <SingleSelectDropdown
        label="연령"
        options={ageOptions}
        variant="filter"
      />
      <SingleSelectDropdown
        label="성별"
        options={genderOptions}
        variant="filter"
      />
    </div>
  );
};

export default CrewFilterBar;
