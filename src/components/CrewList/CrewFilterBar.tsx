import MultiSelectDropdown from "./MultiSelectDropdown";
import RegionSelectDropdown from "./RegionSelectDropdown";
import SingleSelectDropdown from "./SingleSelectDropdown";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import manIcon from "../../assets/icons/ic_man_28.svg";
import womanIcon from "../../assets/icons/ic_woman_28.svg";

const categoryOptions = [
  "스터디",
  "사교",
  "운동/등산",
  "액티비티",
  "여행",
  "음식",
  "음악/악기",
  "스포츠관람",
  "사진/영상",
];

const activityOptions = [
  "오프라인",
  "온라인",
  "기록공유",
  "뒷풀이",
  "친목금지",
  "봉사활동",
  "대회참가",
  "금주",
  "금연",
  "정기모임",
  "비정기모임",
  "프로젝트",
  "자유참석",
  "소규모",
  "정보공유",
];

const styleOptions = [
  "목표지향",
  "소통",
  "친목",
  "개인플레이",
  "집중/몰입",
  "자유로운",
  "활발한",
  "규칙적인",
  "힐링/자유",
  "챌린지/도전",
  "장기참여",
  "단기참여",
  "초보환영",
  "협업",
  "실력향상",
];

const regionOption = {
  서울: [
    "전지역",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
  ],
  경기: ["수원시", "성남시", "고양시", "안양시"],
  인천: ["계양구", "부평구", "남동구", "연수구"],
  강원: ["춘천시", "원주시", "강릉시", "동해시"],
  대전: ["동구", "중구", "서구", "유성구"],
  세종: ["세종시"],
  충남: ["천안시", "아산시", "공주시"],
  충북: ["청주시", "충주시", "제천시"],
  부산: ["해운대구", "수영구", "동래구", "부산진구"],
  울산: ["남구", "중구", "동구", "북구"],
  경남: ["창원시", "김해시", "양산시", "진주시"],
  경북: ["포항시", "경주시", "구미시", "안동시"],
  대구: ["중구", "동구", "서구", "남구"],
  광주: ["북구", "서구", "남구", "동구"],
  전남: ["여수시", "순천시", "광양시", "목포시"],
  전북: ["전주시", "익산시", "군산시", "정읍시"],
  제주: ["제주시", "서귀포시"],
};

const ageOptions = [
  { label: "1998" },
  { label: "1999" },
  { label: "2000" },
  { label: "2001" },
  { label: "2002" },
  { label: "2003" },
  { label: "2004" },
  { label: "2005" },
  { label: "2006" },
];

const genderOption = [
  { label: "선택 안 함" },
  { label: "남성", icon: <img src={manIcon} alt="남성" /> },
  { label: "여성", icon: <img src={womanIcon} alt="여성" /> },
];

const CrewFilterBar = () => {
  return (
    <div className="flex gap-3 flex-wrap pb-[24px]">
      {/* 새로고침 버튼 */}
      <button className="h-[50px] w-[50px] flex items-center justify-center rounded-full border-[2px] border-[#D9DADD]">
        <img src={resetIcon} alt="필터 초기화" className="w-[28px] h-[28px]" />
      </button>
      <MultiSelectDropdown
        label="카테고리"
        options={categoryOptions}
        singleSelect
      />
      <MultiSelectDropdown label="활동" options={activityOptions} />
      <MultiSelectDropdown label="스타일" options={styleOptions} />
      <RegionSelectDropdown label="지역" regions={regionOption} />
      <SingleSelectDropdown
        label="연령"
        options={ageOptions}
        variant="filter"
      />
      <SingleSelectDropdown
        label="성별"
        options={genderOption}
        variant="filter"
      />
    </div>
  );
};

export default CrewFilterBar;
