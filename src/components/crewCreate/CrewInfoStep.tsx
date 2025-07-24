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
  const [headcount, setHeadcount] = useState<number | null>(null);
  const [unlimited, setUnlimited] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);

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
          placeholder="크루명을 입력해주세요"
          className="border-[2px] border-[#C5C6CB] focus:border-[#3A3ADB] focus:outline-none placeholder:text-[#93959D] font-medium text-xl p-4 rounded-lg"
        />
      </div>
      {/* 모집 인원 */}
      <div className="flex flex-col pb-8">
        <label htmlFor="crewSize" className="font-semibold text-[22px] pb-2">
          모집 인원<span className="text-[#FF4949]">*</span>
        </label>
        <div className="flex items-center gap-4 pb-2">
          <label className="text-[22px] font-semibold whitespace-nowrap">
            최대
          </label>
          <HeadcountDropdown value={headcount} onChange={setHeadcount} />
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setUnlimited(!unlimited)}
        >
          <img
            src={unlimited ? checkedIcon : uncheckedIcon}
            alt="인원 제한 없음"
          />
          <span className="text-[20px] font-medium text-[#5E6068]">
            인원 제한 없음
          </span>
        </div>
      </div>
      {/* 크루 배너 */}
      <div className="flex flex-col pb-8">
        <label htmlFor="crewBanner" className="font-semibold text-[22px] pb-2">
          크루 배너
        </label>
        <div className="flex items-center gap-16">
          <div className="relative w-34 h-34">
            <img
              src={defaultBanner}
              alt="기본 배너"
              className="w-full h-full rounded-md object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-[50px] h-[50px] bg-[#3A3ADB] border-[4px] border-white rounded-full flex items-center justify-center cursor-pointer">
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
        <label className="font-semibold text-[22px] pb-2">
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
          <label className="font-semibold text-[22px] pb-2">
            활동<span className="text-[#FF4949]">*</span>
          </label>
          <span className="text-[#FF4949] text-[18px] font-normal pb-2">
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
          <label className="font-semibold text-[22px] pb-2">
            스타일<span className="text-[#FF4949]">*</span>
          </label>
          <span className="text-[#FF4949] text-[18px] font-normal pb-2">
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
        <label className="font-semibold text-[22px] pb-2">지역</label>
        <RegionSelectDropdown label="지역" regions={regionOptions} />
      </div>
      {/* 자격 (연령대, 성별) */}
      <div className="flex flex-col pb-8">
        <label className="font-semibold text-[22px] pb-2">자격</label>
        <div className="flex flex-wrap gap-8 items-center">
          {/* 연령대 */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[22px] text-[#2B2C31]">
              연령대
            </span>
            <SingleSelectDropdown
              label="00대"
              options={ageGroupOptions}
              variant="filter"
            />
          </div>
          {/* 성별 */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-[22px] text-[#2B2C31]">
              성별
            </span>
            <GenderSelect />
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setUnlimited(!unlimited)}
          >
            <img
              src={unlimited ? checkedIcon : uncheckedIcon}
              alt="성별 제한 없음"
            />
            <span className="text-[20px] font-medium text-[#5E6068]">
              성별 제한 없음
            </span>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button
          className="w-[875px] h-17 bg-[#93959D] text-[#FFFFFF] text-[20px] font-semibold rounded-lg"
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default CrewInfoStep;
