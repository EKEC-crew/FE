import { useNavigate } from "react-router-dom";
import ListIconBk from "../../assets/icons/ic_listsearch_36.svg";
import ListIconWt from "../../assets/icons/ic_listsearch_white_36.svg";
import { useState } from "react";
const FilterButton = () => {
  const navigate = useNavigate();
  const [isHover, setHover] = useState(false);
  return (
    <button
      onClick={() => navigate("/searchPage")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-2 w-full h-[48px] text-left px-4 py-2
             rounded-[8px] bg-[#F7F7FB] focus:outline-none hover:bg-[#3A3ADB] hover:text-white"
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        backgroundClip: "padding-box",
      }}
    >
      <img
        src={isHover ? ListIconWt : ListIconBk}
        alt="list"
        className="w-7 h-7"
      />
      필터 설정하기
    </button>
  );
};
export default FilterButton;
