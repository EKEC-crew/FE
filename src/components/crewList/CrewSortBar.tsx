import {
  headcountOptions,
  sortOptions,
} from "../../constants/crewFilterOptions";
import SingleSelectDropdown from "./SingleSelectDropdown";

interface CrewSortBarProps {
  sort: number;
  setSort: (val: number) => void;
  headcount: number | null;
  setHeadcount: (val: number | null) => void;
  totalCount: number;
}

const CrewSortBar = ({
  sort,
  setSort,
  headcount,
  setHeadcount,
  totalCount,
}: CrewSortBarProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      {/* 크루 개수 */}
      <p className="text-xl font-medium text-[#5E6068]">전체 {totalCount}건</p>
      {/* 정렬 옵션 */}
      <div className="flex gap-3">
        <SingleSelectDropdown
          label="인원수"
          options={headcountOptions}
          selected={headcount}
          onSelect={(val) => {
            setHeadcount(val);
          }}
          variant="sort"
        />
        <SingleSelectDropdown
          label="리뷰순"
          options={sortOptions}
          selected={sort}
          onSelect={setSort}
          variant="sort"
        />
      </div>
    </div>
  );
};

export default CrewSortBar;
