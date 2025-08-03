import { useState } from "react";
import SingleSelectDropdown from "./SingleSelectDropdown";

const headcountOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
  { label: "50", value: 50 },
  { label: "60", value: 60 },
  { label: "70", value: 70 },
  { label: "80", value: 80 },
  { label: "90", value: 90 },
  { label: "100 이상", value: 100 },
];

const sortOptions = [
  { label: "리뷰순", value: 1 },
  { label: "관련도순", value: 2 },
  { label: "등록일순", value: 3 },
  { label: "최신업데이트순", value: 4 },
];

const CrewSortBar = () => {
  const [selectedHeadcount, setSelectedHeadcount] = useState<number | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-between mb-3">
      {/* 크루 개수 */}
      <p className="text-xl font-medium text-[#5E6068]">전체 00건</p>
      {/* 정렬 옵션 */}
      <div className="flex gap-3">
        <SingleSelectDropdown
          label="인원수"
          options={headcountOptions}
          selected={selectedHeadcount}
          onSelect={setSelectedHeadcount}
          variant="sort"
        />
        <SingleSelectDropdown
          label="리뷰순"
          options={sortOptions}
          selected={selectedSort}
          onSelect={setSelectedSort}
          variant="sort"
        />
      </div>
    </div>
  );
};

export default CrewSortBar;
