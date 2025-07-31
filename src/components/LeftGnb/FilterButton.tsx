import { useLocation } from "react-router-dom";
import ActionButton from "./ActionButton";
import listIconBk from "../../assets/icons/ic_listsearch_36.svg";
import listIconWt from "../../assets/icons/ic_listsearch_white_36.svg";

const FilterButton = () => {
  const location = useLocation();
  const isActive = location.pathname === "/crewFilterPage"; // 현재 페이지 체크

  return (
    <ActionButton
      label="필터 설정하기"
      icon={isActive ? listIconWt : listIconBk} // 활성화일 때 흰색 아이콘
      iconHover={listIconWt}
      to="/crewFilterPage"
      isActive={isActive} // 활성화 상태 전달 -> 배경색이 바뀌어야 하니까
    />
  );
};

export default FilterButton;
