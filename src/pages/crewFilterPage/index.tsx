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
} from "../../constants/crewFilterOptions.ts";
import { useNavigate } from "react-router-dom";
import { useCrewFilters } from "../../hooks/crewFilter/useCrewFilters.ts";
import { buildFilterQuery } from "../../utils/crewFilter/buildFilterQuery.ts";

const CrewFilterPage = () => {
  const navigate = useNavigate();

  const { filters, setFilters, isFilterSelected } = useCrewFilters();

  const handleSearch = () => {
    const query = buildFilterQuery(filters);
    navigate({ pathname: "/crewListPage", search: `?${query}` });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-4 sm:px-10 md:px-16 lg:px-20 xl:px-[180px] 2xl:px-[235px] pt-20 pb-40">
        {/* 헤더 */}
        <div className="text-center my-20">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-[#000000] mb-6">
            어떤 크루의 성향을 원하시나요?
          </h2>
        </div>
        {/* 옵션 */}
        <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000] px-18">
          카테고리
        </h2>
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
        <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000] px-18 mt-10">
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
        <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000] px-18 mt-10">
          스타일
        </h2>
        <OptionGrid
          type="multiple"
          options={styleOptions}
          exclusivePairs={[[11, 12]]}
          selected={filters.style}
          onChange={(val) => setFilters((prev) => ({ ...prev, style: val }))}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 xl:gap-64 mt-10 px-18">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000]">
              지역
            </h2>
            <RegionSelectDropdown
              label="지역"
              regions={regionOptions}
              valueIds={filters.regionIds}
              onChangeIds={(ids) =>
                setFilters((prev) => ({
                  ...prev,
                  regionIds: ids,
                  regionSido: "",
                  regionGu: "",
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000]">
              연령대
            </h2>
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
          <h2 className="text-2xl lg:text-[2rem] font-bold text-[#000000] mb-4">
            성별
          </h2>
          <GenderSelect
            value={filters.gender}
            onChange={(val) => setFilters((prev) => ({ ...prev, gender: val }))}
          />
        </div>
        {/* 크루 찾아보기 버튼 */}
        <div className="w-full flex justify-center mt-20 px-18">
          <button
            type="button"
            disabled={!isFilterSelected()}
            onClick={handleSearch}
            className={`w-full h-17 text-2xl lg:text-[1.675rem] font-semibold rounded-lg 
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

export default CrewFilterPage;
