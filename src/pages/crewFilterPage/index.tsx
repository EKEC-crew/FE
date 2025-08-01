import OptionGrid from "../../components/crewFilter/OptionGrid";
import logo from "../../assets/icons/ic_logo graphic_74.svg";
import RegionSelectDropdown from "../../components/crewList/RegionSelectDropdown";
import SingleSelectDropdown from "../../components/crewList/SingleSelectDropdown";
import GenderSelect from "../../components/crewFilter/GenderSelect";
import {
  categoryOptions,
  activityOptions,
  styleOptions,
  regionOptions,
  ageGroupOptions,
} from "../../components/crewList/optionsDummy.ts";
import { useState } from "react";

const crewFilterPage = () => {
  const [filters, setFilters] = useState({
    category: null as number | null,
    activity: [] as number[],
    style: [] as number[],
    regionSido: "",
    regionGu: "",
    age: null as number | null,
    gender: null as number | null,
  });

  const isFilterSelected = () => {
    const { category, activity, style, regionSido, regionGu, age, gender } =
      filters;
    return (
      category !== null ||
      activity.length > 0 ||
      style.length > 0 ||
      regionSido !== "" ||
      regionGu !== "" ||
      age !== null ||
      gender !== null
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[235px] pt-20 pb-40">
        {/* 헤더 */}
        <div className="text-center my-20">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="text-[2.5rem] font-bold text-[#000000] mb-6">
            어떤 크루의 성향을 원하시나요?
          </h2>
        </div>
        {/* 옵션 */}
        <h2 className="text-[2rem] font-bold text-[#000000] px-18">카테고리</h2>
        <OptionGrid
          type="single"
          options={categoryOptions}
          selected={filters.category ? [filters.category] : []}
          onChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              category: val.length > 0 ? val[0] : null,
            }))
          }
        />
        <h2 className="text-[2rem] font-bold text-[#000000] px-18 mt-10">
          활동
        </h2>
        <OptionGrid
          type="multiple"
          options={activityOptions}
          exclusivePairs={[
            [1, 2],
            [10, 11],
          ]}
          selected={filters.activity}
          onChange={(val) => setFilters((prev) => ({ ...prev, activity: val }))}
        />
        <h2 className="text-[2rem] font-bold text-[#000000] px-18 mt-10">
          스타일
        </h2>
        <OptionGrid
          type="multiple"
          options={styleOptions}
          exclusivePairs={[[11, 12]]}
          selected={filters.style}
          onChange={(val) => setFilters((prev) => ({ ...prev, style: val }))}
        />
        <div className="flex gap-64 mt-10 px-18">
          <div className="flex flex-col gap-4">
            <h2 className="text-[2rem] font-bold text-[#000000]">지역</h2>
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
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[2rem] font-bold text-[#000000]">연령대</h2>
            <SingleSelectDropdown
              label="00대"
              options={ageGroupOptions}
              selected={filters.age}
              onSelect={(val) => setFilters((prev) => ({ ...prev, age: val }))}
              variant="filter"
            />
          </div>
        </div>
        <div className=" mt-20  px-18">
          <h2 className="text-[2rem] font-bold text-[#000000] mb-4">성별</h2>
          <GenderSelect
            value={filters.gender}
            onChange={(val) => setFilters((prev) => ({ ...prev, gender: val }))}
          />
        </div>
        {/* 크루 찾아보기 버튼 */}
        <div className="w-full flex justify-center mt-20  px-18">
          <button
            disabled={!isFilterSelected()}
            className={`w-full h-17 text-[1.675rem] font-semibold rounded-lg 
          ${
            isFilterSelected()
              ? "bg-[#3A3ADB] text-white cursor-pointer"
              : "bg-[#EFF0F4] text-[#5E6068] cursor-not-allowed"
          }`}
          >
            크루 찾아보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default crewFilterPage;
