import { useNavigate } from "react-router-dom";
import ListIconBk from "../../assets/icons/ic_listsearch_36.svg";
const FilterButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/searchPage")}
      className="flex items-center gap-2 w-full h-[48px] text-left px-4 py-2
             rounded-[8px] bg-[#F7F7FB] focus:outline-none"
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        backgroundClip: "padding-box",
      }}
    >
      <img src={ListIconBk} alt="list" className="w-7 h-7" />
      필터 설정하기
    </button>
  );
};
export default FilterButton;
