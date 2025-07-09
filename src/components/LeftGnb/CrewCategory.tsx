import { useState } from "react";
import categoryIconBk from "../../assets/icons/ic_category_36.svg";
import categoryIconWt from "../../assets/icons/ic_category_white_36.svg";
import pressedRadioBtn from "../../assets/icons/ic_radio_pressed.svg";
import depressedRadioBtn from "../../assets/icons/ic_radio_de.svg";
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

const CrewCategory = () => {
  const [isOpen, setOpen] = useState(true);
  const [isSelected, setSelected] = useState("");
  const { selectedCategory, setCategory } = useCategoryStore();

  return (
    <div>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center gap-2 w-full h-[48px] text-left px-4 py-2 rounded-[8px] transition-colors focus:outline-none ${
          isOpen
            ? "bg-[#3A3ADB] text-white"
            : "bg-[#F7F7FB] text-black hover:bg-[#3A3ADB] hover:text-white"
        }`}
      >
        <img
          src={isOpen ? categoryIconWt : categoryIconBk}
          alt="카테고리 아이콘"
          className="w-7 h-7 object-contain align-middle"
          style={{ marginTop: "-2px" }}
        />
        크루 카테고리
      </button>
      {/*토글을 눌렀을때 나오는 내 크루(현재는 더미데이터 사용)*/}
      {isOpen && (
        <div className="ml-3 mt-3 space-y-2">
          {categoryList.map((category) => (
            <label
              key={category}
              className={`flex items-center w-full h-[48px] gap-2 text-sm px-4 py-2 rounded-[10px] cursor-pointer transition-colors ${
                isSelected === category
                  ? "bg-[#F7F7FB] text-black"
                  : "not-first:hover:bg-[#F7F7FB]  text-black"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setCategory(category)}
                className="hidden"
              />
              <img
                src={
                  selectedCategory === category
                    ? pressedRadioBtn
                    : depressedRadioBtn
                }
                alt="radio"
                className="w-5 h-5"
              />
              {category}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default CrewCategory;
