import { useState } from "react";
import BannerUploadSection from "./BannerUploadSection";
import HeadcountSection from "./HeadcountSection";
import type { CrewInfoDraft } from "../../types/crewCreate/crew";
import QualificationSection from "./QualificationSection";
import StyleSection from "./StyleSection";
import ActivitySection from "./ActivitySection";
import CategorySection from "./CategorySection";
import NameInputSection from "./NameInputSection";
import DescriptionInputSection from "./DescriptionInputSection";
import RegionSection from "./RegionSection";

const CrewInfoStep = ({
  onNext,
}: {
  onNext: (data: { draft: CrewInfoDraft; bannerImage: File | null }) => void;
}) => {
  const [crewName, setCrewName] = useState("");
  const [crewDescription, setCrewDescription] = useState("");
  const [headcount, setHeadcount] = useState<number | null>(null);
  const [isHeadcountUnlimited, setIsHeadcountUnlimited] = useState(false);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [activities, setActivities] = useState<number[]>([]);
  const [styles, setStyles] = useState<number[]>([]);
  const [filters, setFilters] = useState<{
    regionSido: string | null;
    regionGu: string | null;
  }>({
    regionSido: null,
    regionGu: null,
  });
  const [age, setAge] = useState<number | null>(null);
  const [selectedGender, setSelectedGender] = useState<number | null>(null);
  const [isGenderUnlimited, setIsGenderUnlimited] = useState(false);

  const handleNextClick = () => {
    const draft: CrewInfoDraft = {
      crewName,
      crewDescription,
      headcount,
      category,
      activities,
      styles,
      filters,
      age,
      selectedGender,
      isHeadcountUnlimited,
      isGenderUnlimited,
    };

    onNext({
      draft,
      bannerImage: bannerImage,
    });
  };
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
    crewDescription.trim().length > 0 &&
    (headcount !== null || isHeadcountUnlimited) &&
    category !== null &&
    activities.length >= 2 &&
    activities.length <= 5 &&
    styles.length >= 2 &&
    styles.length <= 5;

  return (
    <>
      {/* 크루명 */}
      <NameInputSection value={crewName} onChange={setCrewName} />

      {/* 크루 소개글 */}
      <DescriptionInputSection
        value={crewDescription}
        onChange={setCrewDescription}
      />

      {/* 모집 인원 */}
      <HeadcountSection
        headcount={headcount}
        isUnlimited={isHeadcountUnlimited}
        onHeadcountChange={setHeadcount}
        onToggleUnlimited={toggleHeadcountUnlimited}
      />
      {/* 크루 배너 */}
      <BannerUploadSection
        bannerImage={bannerImage}
        setBannerImage={setBannerImage}
      />

      {/* 카테고리 */}
      <CategorySection category={category} onChange={setCategory} />

      {/* 활동 */}
      <ActivitySection activities={activities} onChange={setActivities} />

      {/* 스타일 */}
      <StyleSection styles={styles} onChange={setStyles} />

      {/* 지역 */}
      <RegionSection
        onChange={(sido, gu) =>
          setFilters((prev) => ({
            ...prev,
            regionSido: sido,
            regionGu: gu,
          }))
        }
      />
      {/* 자격 (연령대, 성별) */}
      <QualificationSection
        age={age}
        onAgeChange={setAge}
        gender={selectedGender}
        onGenderChange={setSelectedGender}
        isGenderUnlimited={isGenderUnlimited}
        toggleGenderUnlimited={toggleGenderUnlimited}
      />
      {/* 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button
          className={`w-full h-17 text-xl font-semibold rounded-lg cursor-pointer 
            ${
              isValid
                ? "bg-[linear-gradient(160deg,#72EDF2_0%,#63BCEC_30%,#3A3ADB_70%,#3A3ADB_100%)] text-white cursor-pointer"
                : "bg-[#93959D] text-white cursor-not-allowed"
            }`}
          onClick={handleNextClick}
          disabled={!isValid}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default CrewInfoStep;
