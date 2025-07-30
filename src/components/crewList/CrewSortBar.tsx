import { useState } from "react";
import SingleSelectDropdown from "./SingleSelectDropdown";

const headcountOptions = [
  { label: "5" },
  { label: "10" },
  { label: "20" },
  { label: "30" },
  { label: "40" },
  { label: "50" },
  { label: "60" },
  { label: "70" },
  { label: "80" },
  { label: "90" },
  { label: "100 이상" },
];

const sortOptions = [
  { label: "리뷰순" },
  { label: "관련도순" },
  { label: "등록일순" },
  { label: "최신업데이트순" },
];

const CrewSortBar = () => {
  const [selectedHeadcount, setSelectedHeadcount] = useState<string | null>(
    null
  );
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

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
