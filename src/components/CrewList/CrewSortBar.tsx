import SingleSelectDropdown from "./SingleSelectDropdown";

const CrewSortBar = () => {
  return (
    <div className="flex items-center justify-between mb-[12px]">
      {/* 크루 개수 */}
      <p className="text-[22px] font-medium text-[#5E6068]">전체 00건</p>
      {/* 정렬 옵션 */}
      <div className="flex gap-[12px]">
        <SingleSelectDropdown
          label="인원수"
          options={[
            "5",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100 이상",
          ]}
          variant="sort"
        />
        <SingleSelectDropdown
          label="리뷰순"
          options={["리뷰순", "관련도순", "등록일순", "최신업데이트순"]}
          variant="sort"
        />
      </div>
    </div>
  );
};

export default CrewSortBar;
