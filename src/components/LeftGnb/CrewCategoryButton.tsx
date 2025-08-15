import ToggleListButton from "./ToggleListButton";
import categoryIconBk from "../../assets/icons/ic_category_36.svg";
import categoryIconWt from "../../assets/icons/ic_category_white_36.svg";
import { useCategoryStore } from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import { categoryOptions } from "../../constants/crewFilterOptions";
import { buildFreshQS } from "../../utils/crewFilter/buildCrewListQs";

const CrewCategoryButton = () => {
  const { selectedCategory, setCategory } = useCategoryStore();
  const navigate = useNavigate();

  // GNB에 표시할 라벨 목록 (옵션 기준으로 통일)
  const items = categoryOptions.map((o) => o.label);

  const handleSelect = (label: string) => {
    setCategory(label); // 필요 시 전역 상태 유지
    const opt = categoryOptions.find((o) => o.label === label);
    if (!opt) return;

    // page=1, sort=2는 필수
    const qs = buildFreshQS({ page: 1, sort: 2, category: opt.value });
    navigate(`/crewListPage?${qs}`);
  };

  return (
    <ToggleListButton
      title="크루 카테고리"
      iconDefault={categoryIconBk}
      iconActive={categoryIconWt}
      items={items}
      selected={selectedCategory}
      setSelected={handleSelect}
      name="category"
    />
  );
};
export default CrewCategoryButton;
