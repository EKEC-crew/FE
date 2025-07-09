import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import useSearchController from "../../hooks/useSearch/useSearchController";
import { useCategoryStore } from "../../store/categoryStore";

interface Props {
  variant: "large" | "compact";
}

export default function SearchBar({ variant }: Props) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const { selectedCategory, setCategory } = useCategoryStore();

  const {
    keyword,
    setKeyword,
    suggestions,
    handleSearch,
    handleSuggestionClick,
  } = useSearchController();

  useEffect(() => {
    if (location.pathname === "/searchPage" && selectedCategory) {
      setKeyword(selectedCategory);
    }

    if (location.pathname === "/home") {
      setCategory(""); // 전역 상태 초기화
      setKeyword(""); // 검색창 입력값도 초기화
    }
  }, [location.pathname]);

  useEffect(() => {
    const isHome = location.pathname === "/";

    if (variant === "compact") {
      if (!isHome) {
        setVisible(true);
        return;
      }

      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        setVisible(scrollTop > 200); // 값은 원하는 만큼 조절
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setVisible(true);
    }
  }, [location.pathname, variant]);

  if (!visible) return null;

  return (
    <div
      className={`relative w-full ${
        variant === "large" ? "max-w-[1200px] mt-8" : "max-w-xl"
      } mx-auto`}
    >
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        onSearch={handleSearch}
        variant={variant}
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full w-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow box-border z-50 overflow-hidden">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(s.label)}
            >
              {s.type === "tag" ? (
                <span className="text-blue-500">{s.label}</span>
              ) : (
                <span>{s.label}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
