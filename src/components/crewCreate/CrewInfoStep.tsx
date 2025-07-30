import HeadcountDropdown from "../../components/crewCreate/HeadcountDropdown";
import { useState } from "react";
import checkedIcon from "../../assets/icons/ic_check_pressed.svg";
import uncheckedIcon from "../../assets/icons/ic_check_de.svg";
import cameraIcon from "../../assets/icons/ic_line_Camera.svg";
import defaultBanner from "../../assets/logo/img_crew_banner.svg";
import OptionGrid from "../../components/crewCreate/OptionGrid";
import {
  activityOptions,
  ageGroupOptions,
  categoryOptions,
  regionOptions,
  styleOptions,
} from "../../components/crewList/optionsDummy";
import RegionSelectDropdown from "../../components/crewList/RegionSelectDropdown";
import SingleSelectDropdown from "../../components/crewList/SingleSelectDropdown";
import GenderSelect from "../../components/crewFilter/GenderSelect";

interface CrewInfoStepProps {
  onNext: () => void;
}

const CrewInfoStep = ({ onNext }: CrewInfoStepProps) => {
  const [crewName, setCrewName] = useState("");
  const [headcount, setHeadcount] = useState<number | null>(null);
  const [isHeadcountUnlimited, setIsHeadcountUnlimited] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ age: string | null }>({
    age: null,
  });
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isGenderUnlimited, setIsGenderUnlimited] = useState(false);

  const toggleHeadcountUnlimited = () => {
    const newState = !isHeadcountUnlimited;
    setIsHeadcountUnlimited(newState);
    if (newState) {
      setHeadcount(null); // 드롭다운 초기화
    }
  };

  const toggleGenderUnlimited = () => {
    const newState = !isGenderUnlimited;
    setIsGenderUnlimited(newState);
    if (newState) {
      setSelectedGender(null); // 성별 선택 초기화
    }
  };

  const isValid =
    crewName.trim().length > 0 &&
    (headcount !== null || isHeadcountUnlimited) &&
    category.length === 1 &&
    activities.length >= 2 &&
    activities.length <= 5 &&
    styles.length >= 2 &&
    styles.length <= 5;

  return (
    <>
      {/* 크루명 */}
      <div className="flex flex-col pb-8">
        <label htmlFor="crewName" className="font-semibold text-[22px] pb-2">
          크루명<span className="text-[#FF4949]">*</span>
        </label>
        <input
          id="crewName"
          type="text"
          value={crewName}
          onChange={(e) => setCrewName(e.target.value)}
          placeholder="크루명을 입력해주세요"
          className="border-[2px] border-[#C5C6CB] focus:border-[#3A3ADB] focus:outline-none placeholder:text-[#93959D] font-medium text-xl p-4 rounded-lg"
        />
      </div>
      {/* 모집 인원 */}
      <div className="flex flex-col pb-8">
        <label
          htmlFor="crewSize"
          className="font-semibold text-[1.375rem] pb-2"
        >
          모집 인원<span className="text-[#FF4949]">*</span>
        </label>
        <div className="flex items-center gap-4 pb-2">
          <label className="text-[1.375rem] font-semibold whitespace-nowrap">
            최대
          </label>
          <HeadcountDropdown
            value={headcount}
            onChange={setHeadcount}
            disabled={isHeadcountUnlimited}
          />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleHeadcountUnlimited}
        >
          <img
            src={isHeadcountUnlimited ? checkedIcon : uncheckedIcon}
            alt="인원 제한 없음"
          />
          <span className="text-xl font-medium text-[#5E6068]">
            인원 제한 없음
          </span>
        </div>
      </div>
      {/* 크루 배너 */}
      <div className="flex flex-col pb-8">
        <label
          htmlFor="crewBanner"
          className="font-semibold text-[1.375rem] pb-2"
        >
          크루 배너
        </label>
        <div className="flex items-center gap-16">
          <div className="relative w-34 h-34">
            <img
              src={defaultBanner}
              alt="기본 배너"
              className="w-full h-full rounded-md object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#3A3ADB] border-[4px] border-white rounded-full flex items-center justify-center cursor-pointer">
              <img src={cameraIcon} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[#93959D] text-xl font-medium">
              크루를 잘 나타낼 수 있는 크루 배너 사진을 등록해주세요!
            </p>
            <p className="text-[#93959D] text-xl font-medium">
              이후에도 크루 배너는 수정할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      {/* 카테고리 */}
      <div className="flex flex-col pb-8">
        <label className="font-semibold text-[1.375rem] pb-2">
          카테고리<span className="text-[#FF4949]">*</span>
        </label>
        <OptionGrid
          options={categoryOptions}
          type="single"
          selected={category}
          onChange={setCategory}
        />
      </div>
      {/* 활동 */}
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-[1.375rem] pb-2">
            활동<span className="text-[#FF4949]">*</span>
          </label>
          <span className="text-[#FF4949] text-lg font-normal pb-2">
            2~5개 복수 선택 가능
          </span>
        </div>
        <OptionGrid
          options={activityOptions}
          type="multiple"
          selected={activities}
          onChange={setActivities}
          maxSelectCount={5}
          exclusivePairs={[
            ["오프라인", "온라인"],
            ["정기모임", "비정기모임"],
          ]}
        />
      </div>
      {/* 스타일 */}
      <div className="flex flex-col pb-8">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-[1.375rem] pb-2">
            스타일<span className="text-[#FF4949]">*</span>
          </label>
          <span className="text-[#FF4949] text-lg font-normal pb-2">
            2~5개 복수 선택 가능
          </span>
        </div>
        <OptionGrid
          options={styleOptions}
          type="multiple"
          selected={styles}
          onChange={setStyles}
          maxSelectCount={5}
          exclusivePairs={[["장기참여", "단기참여"]]}
        />
      </div>
      {/* 지역 */}
      <div className="flex flex-col pb-8">
        <label className="font-semibold text-[1.375rem] pb-2">지역</label>
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
      {/* 자격 (연령대, 성별) */}
      <div className="flex flex-col pb-8">
        <label className="font-semibold text-[1.375rem] pb-2">자격</label>
        <div className="flex flex-wrap gap-8 items-center">
          {/* 연령대 */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[1.375rem] text-[#2B2C31]">
              연령대
            </span>
            <SingleSelectDropdown
              label="00대"
              options={ageGroupOptions}
              selected={filters.age}
              onSelect={(val) => setFilters((prev) => ({ ...prev, age: val }))}
              variant="filter"
            />
          </div>
          {/* 성별 */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[1.375rem] text-[#2B2C31]">
              성별
            </span>
            <GenderSelect
              value={selectedGender}
              onChange={setSelectedGender}
              disabled={isGenderUnlimited}
            />
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleGenderUnlimited}
          >
            <img
              src={isGenderUnlimited ? checkedIcon : uncheckedIcon}
              alt="성별 제한 없음"
            />
            <span className="text-xl font-medium text-[#5E6068]">
              성별 제한 없음
            </span>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button
          className={`w-full h-17 text-xl font-semibold rounded-lg cursor-pointer 
            ${
              isValid
                ? "bg-[linear-gradient(160deg,#72EDF2_0%,#63BCEC_30%,#3A3ADB_70%,#3A3ADB_100%)] text-white cursor-pointer"
                : "bg-[#93959D] text-white cursor-not-allowed"
            }`}
          onClick={onNext}
          disabled={!isValid}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default CrewInfoStep;
