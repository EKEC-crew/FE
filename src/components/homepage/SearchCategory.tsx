import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../store/categoryStore";

import self from "../../assets/icons/homeCategory/ic_Self_60.svg";
import activity from "../../assets/icons/homeCategory/ic_activity_60.svg";
import exercise from "../../assets/icons/homeCategory/ic_exercise_60.svg";
import food from "../../assets/icons/homeCategory/ic_food_60.svg";
import music from "../../assets/icons/homeCategory/ic_music_60.svg";
import performance from "../../assets/icons/homeCategory/ic_performance_60.svg";
import society from "../../assets/icons/homeCategory/ic_society_60.svg";
import sports from "../../assets/icons/homeCategory/ic_sports_60.svg";
import study from "../../assets/icons/homeCategory/ic_study_60.svg";
import travel from "../../assets/icons/homeCategory/ic_travel_60.svg";
import video from "../../assets/icons/homeCategory/ic_Video_60.svg";

const categoryItems = [
  { label: "자기개발", value: "자기개발", icon: self },
  { label: "액티비티", value: "액티비티", icon: activity },
  { label: "운동/등산", value: "운동/등산", icon: exercise },
  { label: "음식", value: "음식", icon: food },
  { label: "음악/악기", value: "음악/악기", icon: music },
  { label: "문화/공연", value: "문화/공연", icon: performance },
  { label: "사교", value: "사교", icon: society },
  { label: "스포츠관람", value: "스포츠관람", icon: sports },
  { label: "스터디", value: "스터디", icon: study },
  { label: "여행", value: "여행", icon: travel },
  { label: "사진/영상", value: "사진/영상", icon: video },
];

const divCss =
  "h-[110px] w-[70px] flex flex-col items-center gap-2 cursor-pointer";
const imgCss = "w-[60px] h-[60px] rounded-xl shadow-md bg-white";
const textCss = "text-[#37383E]";

const SearchCategory = () => {
  const navigate = useNavigate();
  const { setCategory } = useCategoryStore();

  const handleClick = (category: string) => {
    setCategory(category); // zustand 전역 상태 설정
    navigate("/searchPage"); // 검색 페이지로 이동
  };
  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {categoryItems.map(({ label, value, icon }) => (
        <div key={value} className={divCss} onClick={() => handleClick(value)}>
          <img src={icon} alt={`${label} 아이콘`} className={imgCss} />
          <div className={textCss}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchCategory;
