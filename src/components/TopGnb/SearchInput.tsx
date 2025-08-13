import searchIcon from "../../assets/icons/ic_search_36.svg";
import btnBg from "../../assets/icons/btn_search_60.svg";
interface Props {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  variant: "large" | "compact";
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  variant,
}: Props) {
  const inputClass =
    variant === "large"
      ? "h-14 text-lg rounded-full"
      : "h-9 text-sm rounded-full";
  const inputBtnBgClass = variant === "large" ? "h-15 w-15" : "h-10 w-10";
  const inputBtnClass = variant === "large" ? "h-10 w-10" : "h-7 w-7";
  return (
    <div className="relative w-full transition-all duration-300">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="검색하고 싶은 태그 혹은 크루명을 입력하세요!"
        className={`w-full pl-10 pr-4 border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
      />
      <button
        onClick={onSearch}
        className="absolute right-[-2px] top-1/2 -translate-y-1/2"
      >
        <div className={`relative ${inputBtnBgClass}`}>
          {/* 배경 이미지 */}
          <img
            src={btnBg}
            className="absolute inset-0 h-full w-full"
            alt="버튼배경"
          />

          {/* 위에 올릴 돋보기 */}
          <img
            src={searchIcon}
            className={`absolute inset-0 m-auto ${inputBtnClass}`}
            alt="돋보기아이콘"
          />
        </div>
      </button>
    </div>
  );
}
