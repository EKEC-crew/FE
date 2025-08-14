import study from "../assets/icons/category/ic_study_60.svg";
import society from "../assets/icons/category/ic_society_60.svg";
import exercise from "../assets/icons/category/ic_exercise_60.svg";
import activity from "../assets/icons/category/ic_activity_60.svg";
import travel from "../assets/icons/category/ic_travel_60.svg";
import food from "../assets/icons/category/ic_food_60.svg";
import music from "../assets/icons/category/ic_music_60.svg";
import sports from "../assets/icons/category/ic_sports_60.svg";
import performance from "../assets/icons/category/ic_performance_60.svg";
import self from "../assets/icons/category/ic_Self_60.svg";
import video from "../assets/icons/category/ic_Video_60.svg";

import afterParty from "../assets/icons/activity/ic_after party_60.svg";
import offline from "../assets/icons/activity/ic_Offline_60.svg";
import online from "../assets/icons/activity/ic_Online_60.svg";
import recordShare from "../assets/icons/activity/ic_Record_60.svg";
import noFriendship from "../assets/icons/activity/ic_no friendship_60.svg";
import volunteer from "../assets/icons/activity/ic_Volunteer_60.svg";
import contest from "../assets/icons/activity/ic_Contest_60.svg";
import noDrinking from "../assets/icons/activity/ic_no drinking_60.svg";
import noSmoking from "../assets/icons/activity/ic_no smoking_60.svg";
import regularMeeting from "../assets/icons/activity/ic_regular_60.svg";
import irregularMeeting from "../assets/icons/activity/ic_irregularity_60.svg";
import project from "../assets/icons/activity/ic_project_60.svg";
import freeAttendance from "../assets/icons/activity/ic_free attendance_60.svg";
import smallScale from "../assets/icons/activity/ic_small scale_60.svg";
import infoShare from "../assets/icons/activity/ic_information_60.svg";

import goals from "../assets/icons/style/ic_Goals_60.svg";
import communication from "../assets/icons/style/ic_Communication_60.svg";
import friendship from "../assets/icons/style/ic_friendship_60.svg";
import individualPlay from "../assets/icons/style/ic_individual_60.svg";
import focus from "../assets/icons/style/ic_focus_60.svg";
import freedom from "../assets/icons/style/ic_freedom_60.svg";
import active from "../assets/icons/style/ic_Active_60.svg";
import rule from "../assets/icons/style/ic_rule_60.svg";
import healing from "../assets/icons/style/ic_healing_60.svg";
import challenge from "../assets/icons/style/ic_challenge_60.svg";
import longTerm from "../assets/icons/style/ic_long_60.svg";
import shortTerm from "../assets/icons/style/ic_short_60.svg";
import novice from "../assets/icons/style/ic_novice_60.svg";
import together from "../assets/icons/style/ic_together_60.svg";
import improve from "../assets/icons/style/ic_improve_60.svg";
import { serverRegions } from "./serverRegions";

export const categoryOptions = [
  { label: "스터디", value: 1, icon: study },
  { label: "사교", value: 2, icon: society },
  { label: "운동/등산", value: 3, icon: exercise },
  { label: "액티비티", value: 4, icon: activity },
  { label: "여행", value: 5, icon: travel },
  { label: "음식", value: 6, icon: food },
  { label: "음악/악기", value: 7, icon: music },
  { label: "스포츠관람", value: 8, icon: sports },
  { label: "문화/공연", value: 9, icon: performance },
  { label: "자기계발", value: 10, icon: self },
  { label: "사진/영상", value: 11, icon: video },
];

export const activityOptions = [
  { label: "오프라인", value: 1, icon: offline },
  { label: "온라인", value: 2, icon: online },
  { label: "기록공유", value: 3, icon: recordShare },
  { label: "뒷풀이", value: 4, icon: afterParty },
  { label: "친목금지", value: 5, icon: noFriendship },
  { label: "봉사활동", value: 6, icon: volunteer },
  { label: "대회참가", value: 7, icon: contest },
  { label: "금주", value: 8, icon: noDrinking },
  { label: "금연", value: 9, icon: noSmoking },
  { label: "정기모임", value: 10, icon: regularMeeting },
  { label: "비정기모임", value: 11, icon: irregularMeeting },
  { label: "프로젝트", value: 12, icon: project },
  { label: "자유참석", value: 13, icon: freeAttendance },
  { label: "소규모", value: 14, icon: smallScale },
  { label: "정보공유", value: 15, icon: infoShare },
];

export const styleOptions = [
  { label: "목표지향", value: 1, icon: goals },
  { label: "소통", value: 2, icon: communication },
  { label: "친목", value: 3, icon: friendship },
  { label: "개인플레이", value: 4, icon: individualPlay },
  { label: "집중/몰입", value: 5, icon: focus },
  { label: "자유로운", value: 6, icon: freedom },
  { label: "활발한", value: 7, icon: active },
  { label: "규칙적인", value: 8, icon: rule },
  { label: "힐링/자유", value: 9, icon: healing },
  { label: "챌린지/도전", value: 10, icon: challenge },
  { label: "장기참여", value: 11, icon: longTerm },
  { label: "단기참여", value: 12, icon: shortTerm },
  { label: "초보환영", value: 13, icon: novice },
  { label: "협업", value: 14, icon: together },
  { label: "실력향상", value: 15, icon: improve },
];

export const regionOptions: Record<string, string[]> = serverRegions.reduce(
  (acc, r) => {
    if (!acc[r.sido]) acc[r.sido] = [];
    acc[r.sido].push(r.goo);
    return acc;
  },
  {} as Record<string, string[]>
);

export const ageOptions = [
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

export const ageGroupOptions = [
  { label: "10대", value: 1 },
  { label: "20대", value: 2 },
  { label: "30대", value: 3 },
  { label: "40대", value: 4 },
  { label: "50대 이상", value: 5 },
];

export const headcountOptions = [
  { label: "선택 안 함", value: null },
  { label: "5명", value: 5 },
  { label: "10명", value: 10 },
  { label: "20명", value: 20 },
  { label: "30명", value: 30 },
  { label: "40명", value: 40 },
  { label: "50명", value: 50 },
  { label: "60명", value: 60 },
  { label: "70명", value: 70 },
  { label: "80명", value: 80 },
  { label: "90명", value: 90 },
  { label: "100명 이상", value: 100 },
];

export const sortOptions = [
  { label: "최신순", value: 1 },
  { label: "인원 많은 순", value: 4 },
  { label: "인원 적은 순", value: 3 },
  { label: "리뷰 좋은 순", value: 5, disabled: true },
  { label: "활동 많은 순", value: 2 },
];

export const categoryLabels = categoryOptions.map((item) => item.label);
export const activityLabels = activityOptions.map((item) => item.label);
export const styleLabels = styleOptions.map((item) => item.label);
