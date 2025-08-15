import { useNavigate } from "react-router-dom";
import { categoryOptions } from "../../constants/crewFilterOptions";
import { buildFreshQS } from "../../utils/crewFilter/buildCrewListQs";

const divCss =
  "h-auto w-16 sm:w-20 md:w-[70px] flex flex-col items-center gap-2 rounded-xl cursor-pointer \
   transition-transform duration-300 ease-in-out \
   \ hover:scale-110";

const imgCss =
  "w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-xl shadow-md bg-white";

const textCss = "text-[#37383E] text-xs sm:text-sm md:text-base";

const SearchCategory = () => {
  const navigate = useNavigate();

  const handleClick = (value: number) => {
    // page=1, sort=2는 필수. 단일 카테고리만 전달.
    const qs = buildFreshQS({ page: 1, sort: 2, category: value });
    navigate(`/crewListPage?${qs}`);
  };

  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {categoryOptions.map(({ label, value, icon }) => (
        <div key={value} className={divCss} onClick={() => handleClick(value)}>
          <img src={icon} alt={`${label} 아이콘`} className={imgCss} />
          <div className={textCss}>{label}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchCategory;
