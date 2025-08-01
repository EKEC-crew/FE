import ToggleListButton from "./ToggleListButton";
import categoryIconBk from "../../assets/icons/ic_category_36.svg";
import categoryIconWt from "../../assets/icons/ic_category_white_36.svg";
import { useCategoryStore } from "../../store/categoryStore";

const categoryList = [
  "사교",
  "운동/등산",
  "액티비티",
  "여행",
  "음식",
  "음악/악기",
  "스포츠관람",
  "문화/공연",
  "자기개발",
  "사진/영상",
];

const CrewCategoryButton = () => {
  const { selectedCategory, setCategory } = useCategoryStore();

  return (
    <ToggleListButton
      title="크루 카테고리"
      iconDefault={categoryIconBk}
      iconActive={categoryIconWt}
      items={categoryList}
      selected={selectedCategory}
      setSelected={(category) => {
        console.log("선택된 카테고리:", category);
        setCategory(category);
      }}
      name="category"
    />
  );
};

export default CrewCategoryButton;
