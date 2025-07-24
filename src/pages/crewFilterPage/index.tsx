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
  ageOptions,
} from "../../components/crewList/optionsDummy.ts";

const crewFilterPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[235px] pt-20 pb-40">
        {/* 헤더 */}
        <div className="text-center my-20">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="text-[40px] font-bold text-[#000000] mb-6">
            어떤 크루의 성향을 원하시나요?
          </h2>
        </div>
        {/* 옵션 */}
        <h2 className="text-[32px] font-bold text-[#000000] px-18">카테고리</h2>
        <OptionGrid type="single" options={categoryOptions} />
        <h2 className="text-[32px] font-bold text-[#000000] px-18 mt-10">
          활동
        </h2>
        <OptionGrid
          type="multiple"
          options={activityOptions}
          exclusivePairs={[
            ["오프라인", "온라인"],
            ["정기모임", "비정기모임"],
          ]}
        />
        <h2 className="text-[32px] font-bold text-[#000000] px-18 mt-10">
          스타일
        </h2>
        <OptionGrid
          type="multiple"
          options={styleOptions}
          exclusivePairs={[["장기참여", "단기참여"]]}
        />
        <div className="flex gap-64 px-18 mt-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold text-[#000000]">지역</h2>
            <RegionSelectDropdown label="지역" regions={regionOptions} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] font-bold text-[#000000]">연령</h2>
            <SingleSelectDropdown
              label="연령"
              options={ageOptions}
              variant="filter"
            />
          </div>
        </div>
        <div className="px-18 mt-20">
          <h2 className="text-[32px] font-bold text-[#000000] mb-4">성별</h2>
          <GenderSelect />
        </div>
        {/* 크루 찾아보기 버튼 */}
        <div className="w-full flex justify-center mt-20">
          <button className="w-[961px] h-17 bg-[#EFF0F4] text-[#5E6068] text-[26px] font-semibold rounded-lg">
            크루 찾아보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default crewFilterPage;
