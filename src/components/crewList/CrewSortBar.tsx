import SingleSelectDropdown from "./SingleSelectDropdown";

const headcountOptions = [
  { label: "선택 안 함", value: null },
  { label: "5명", value: 5 },
  { label: "10명", value: 10 },
  { label: "20명", value: 20 },
  { label: "30명", value: 30 },
  { label: "40명", value: 40 },
  { label: "50명", value: 50 },
  { label: "60명", value: 60 },
  { label: "70명", value: 70 },
  { label: "80명", value: 80 },
  { label: "90명", value: 90 },
  { label: "100명 이상", value: 100 },
];

const sortOptions = [
  { label: "최신순", value: 1 },
  { label: "인원 많은 순", value: 4 },
  { label: "인원 적은 순", value: 3 },
  { label: "리뷰 좋은 순", value: 5, disabled: true },
  { label: "활동 많은 순", value: 6 },
  { label: "인기순", value: 2 },
];

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
