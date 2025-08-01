import MultiSelectDropdown from "./MultiSelectDropdown";
import RegionSelectDropdown from "./RegionSelectDropdown";
import SingleSelectDropdown from "./SingleSelectDropdown";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import manIcon from "../../assets/icons/ic_man_28.svg";
import womanIcon from "../../assets/icons/ic_woman_28.svg";
import {
  activityLabels,
  ageGroupOptions,
  categoryLabels,
  regionOptions,
  styleLabels,
} from "./optionsDummy";

export type CrewFilter = {
  category: number[];
  activity: number[];
  style: number[];
  regionSido: string;
  regionGu: string;
  age: number | null;
  gender: number | null;
};

interface CrewFilterBarProps {
  filters: CrewFilter;
  setFilters: React.Dispatch<React.SetStateAction<CrewFilter>>;
}

const genderOptions = [
  { label: "선택 안 함", value: null },
  { label: "남성", value: 1, icon: <img src={manIcon} alt="남성" /> },
  { label: "여성", value: 2, icon: <img src={womanIcon} alt="여성" /> },
];

const CrewFilterBar = ({ filters, setFilters }: CrewFilterBarProps) => {
  return (
    <div className="flex gap-3 flex-wrap pb-8">
      {/* 새로고침 버튼 */}
      <button
        className="h-12 w-12 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD]"
        onClick={() =>
          setFilters({
            category: [],
            activity: [],
            style: [],
            regionSido: "",
            regionGu: "",
            age: null,
            gender: null,
          })
        }
      >
        <img src={resetIcon} alt="필터 초기화" />
      </button>
      <MultiSelectDropdown
        label="카테고리"
        options={categoryLabels}
        singleSelect
      />
      <MultiSelectDropdown label="활동" options={activityLabels} />
      <MultiSelectDropdown label="스타일" options={styleLabels} />
      <RegionSelectDropdown
        label="지역"
        regions={regionOptions}
        onChange={(sido, gu) =>
          setFilters((prev) => ({
            ...prev,
            regionSido: sido,
            regionGu: gu,
          }))
        }
      />
      <SingleSelectDropdown
        label="연령"
        options={ageGroupOptions}
        selected={filters.age}
        onSelect={(val) => setFilters((prev) => ({ ...prev, age: val }))}
        variant="filter"
      />
      <SingleSelectDropdown
        label="성별"
        options={genderOptions}
        selected={filters.gender}
        onSelect={(val) => setFilters((prev) => ({ ...prev, gender: val }))}
        variant="filter"
      />
    </div>
  );
};

export default CrewFilterBar;
