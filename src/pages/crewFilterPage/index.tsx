import OptionGrid from "../../components/crewFilter/OptionGrid";
import logo from "../../assets/icons/ic_logo graphic_74.svg";
import RegionSelectDropdown from "../../components/crewList/RegionSelectDropdown";
import SingleSelectDropdown from "../../components/crewList/SingleSelectDropdown";

import study from "../../assets/icons/category/ic_study_60.svg";
import society from "../../assets/icons/category/ic_society_60.svg";
import exercise from "../../assets/icons/category/ic_exercise_60.svg";
import activity from "../../assets/icons/category/ic_activity_60.svg";
import travel from "../../assets/icons/category/ic_travel_60.svg";
import food from "../../assets/icons/category/ic_food_60.svg";
import music from "../../assets/icons/category/ic_music_60.svg";
import sports from "../../assets/icons/category/ic_sports_60.svg";
import performance from "../../assets/icons/category/ic_performance_60.svg";
import self from "../../assets/icons/category/ic_self_60.svg";
import video from "../../assets/icons/category/ic_video_60.svg";

import afterParty from "../../assets/icons/activity/ic_after party_60.svg";
import offline from "../../assets/icons/activity/ic_Offline_60.svg";
import online from "../../assets/icons/activity/ic_Online_60.svg";
import recordShare from "../../assets/icons/activity/ic_Record_60.svg";
import noFriendship from "../../assets/icons/activity/ic_no friendship_60.svg";
import volunteer from "../../assets/icons/activity/ic_Volunteer_60.svg";
import contest from "../../assets/icons/activity/ic_Contest_60.svg";
import noDrinking from "../../assets/icons/activity/ic_no drinking_60.svg";
import noSmoking from "../../assets/icons/activity/ic_no smoking_60.svg";
import regularMeeting from "../../assets/icons/activity/ic_regular_60.svg";
import irregularMeeting from "../../assets/icons/activity/ic_irregularity_60.svg";
import project from "../../assets/icons/activity/ic_project_60.svg";
import freeAttendance from "../../assets/icons/activity/ic_free attendance_60.svg";
import smallScale from "../../assets/icons/activity/ic_small scale_60.svg";
import infoShare from "../../assets/icons/activity/ic_information_60.svg";

import goals from "../../assets/icons/style/ic_Goals_60.svg";
import communication from "../../assets/icons/style/ic_Communication_60.svg";
import friendship from "../../assets/icons/style/ic_friendship_60.svg";
import individualPlay from "../../assets/icons/style/ic_individual_60.svg";
import focus from "../../assets/icons/style/ic_focus_60.svg";
import freedom from "../../assets/icons/style/ic_freedom_60.svg";
import active from "../../assets/icons/style/ic_Active_60.svg";
import rule from "../../assets/icons/style/ic_rule_60.svg";
import healing from "../../assets/icons/style/ic_healing_60.svg";
import challenge from "../../assets/icons/style/ic_challenge_60.svg";
import longTerm from "../../assets/icons/style/ic_long_60.svg";
import shortTerm from "../../assets/icons/style/ic_short_60.svg";
import novice from "../../assets/icons/style/ic_novice_60.svg";
import together from "../../assets/icons/style/ic_together_60.svg";
import improve from "../../assets/icons/style/ic_improve_60.svg";
import GenderSelect from "../../components/crewFilter/GenderSelect";

const categoryOptions = [
  { label: "스터디", value: "스터디", icon: study },
  { label: "사교", value: "사교", icon: society },
  { label: "운동/등산", value: "운동/등산", icon: exercise },
  { label: "액티비티", value: "액티비티", icon: activity },
  { label: "여행", value: "여행", icon: travel },
  { label: "음식", value: "음식", icon: food },
  { label: "음악/악기", value: "음악/악기", icon: music },
  { label: "스포츠관람", value: "스포츠관람", icon: sports },
  { label: "문화/공연", value: "문화/공연", icon: performance },
  { label: "자기계발", value: "자기계발", icon: self },
  { label: "사진/영상", value: "사진/영상", icon: video },
];

const activityOptions = [
  { label: "오프라인", value: "오프라인", icon: offline },
  { label: "온라인", value: "온라인", icon: online },
  { label: "기록공유", value: "기록공유", icon: recordShare },
  { label: "뒷풀이", value: "뒷풀이", icon: afterParty },
  { label: "친목금지", value: "친목금지", icon: noFriendship },
  { label: "봉사활동", value: "봉사활동", icon: volunteer },
  { label: "대회참가", value: "대회참가", icon: contest },
  { label: "금주", value: "금주", icon: noDrinking },
  { label: "금연", value: "금연", icon: noSmoking },
  { label: "정기모임", value: "정기모임", icon: regularMeeting },
  { label: "비정기모임", value: "비정기모임", icon: irregularMeeting },
  { label: "프로젝트", value: "프로젝트", icon: project },
  { label: "자유참석", value: "자유참석", icon: freeAttendance },
  { label: "소규모", value: "소규모", icon: smallScale },
  { label: "정보공유", value: "정보공유", icon: infoShare },
];

const styleOptions = [
  { label: "목표지향", value: "목표지향", icon: goals },
  { label: "소통", value: "소통", icon: communication },
  { label: "친목", value: "친목", icon: friendship },
  { label: "개인플레이", value: "개인플레이", icon: individualPlay },
  { label: "집중/몰입", value: "집중/몰입", icon: focus },
  { label: "자유로운", value: "자유로운", icon: freedom },
  { label: "활발한", value: "활발한", icon: active },
  { label: "규칙적인", value: "규칙적인", icon: rule },
  { label: "힐링/자유", value: "힐링/자유", icon: healing },
  { label: "챌린지/도전", value: "챌린지/도전", icon: challenge },
  { label: "장기참여", value: "장기참여", icon: longTerm },
  { label: "단기참여", value: "단기참여", icon: shortTerm },
  { label: "초보환영", value: "초보환영", icon: novice },
  { label: "협업", value: "협업", icon: together },
  { label: "실력향상", value: "실력향상", icon: improve },
];

const regionOptions = {
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
          <h2 className="text-[32px] font-bold text-[#000000]">성별</h2>
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
