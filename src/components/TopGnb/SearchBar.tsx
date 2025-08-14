import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import useSearchController, {
  type Suggestion,
} from "../../hooks/useSearch/useSearchController";
import { useCategoryStore } from "../../store/categoryStore";
import { buildFreshQS } from "../../utils/crewFilter/buildCrewListQs";

interface Props {
  variant: "large" | "compact";
}

export default function SearchBar({ variant }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  const { selectedCategory, setCategory } = useCategoryStore();
  const {
    keyword,
    setKeyword,
    suggestions,
    // handleSearch,
    // handleSuggestionClick,
  } = useSearchController();

  useEffect(() => {
    if (location.pathname === "/searchPage" && selectedCategory) {
      setKeyword(selectedCategory);
    }

    if (location.pathname === "/") {
      setCategory(""); // 전역 상태 초기화
      setKeyword(""); // 검색창 입력값도 초기화
    }
  }, [location.pathname, selectedCategory, setCategory, setKeyword]);

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

  // 포커스 감지: 캡처로 안정적으로
  const onFocusCapture = () => setHasFocus(true);
  const onBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !e.currentTarget.contains(next)) setHasFocus(false);
  };

  // 자동열림: 포커스 + 제안 있을 때만
  useEffect(() => {
    setOpen(hasFocus && Boolean(keyword.trim()) && suggestions.length > 0);
  }, [hasFocus, keyword, suggestions]);

  // 라우트 변경 시 닫기
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  if (!visible) return null;

  // 항상 “처음 검색” 규칙: 이름만 OR 태그 하나만
  const goToListFresh = (patch: {
    name?: string;
    category?: number;
    activity?: number;
    style?: number;
  }) => {
    const qs = buildFreshQS(patch);
    const target = `/crewListPage?${qs}`;
    const current = `${location.pathname}${location.search}`;

    if (current === target) {
      setOpen(false);
      return;
    } // 동일하면 skip
    navigate(target, { replace: location.pathname === "/crewListPage" }); // 리스트 내부는 replace
    setOpen(false);
  };

  // 엔터/돋보기
  const onSearch = () => {
    const q = keyword.trim();
    if (!q) return;
    const first = suggestions[0];
    if (q.startsWith("#") && first?.type === "tag") {
      const key =
        first.kind === "category"
          ? "category"
          : first.kind === "activity"
            ? "activity"
            : "style";
      goToListFresh({ [key]: first.id });
      return;
    }
    goToListFresh({ name: q });
  };

  // 항목 선택
  const onPick = (s: Suggestion) => {
    if (s.type === "crew") goToListFresh({ name: s.label });
    else {
      const key =
        s.kind === "category"
          ? "category"
          : s.kind === "activity"
            ? "activity"
            : "style";
      goToListFresh({ [key]: s.id });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        variant === "large" ? "max-w-[1200px] mt-8" : "max-w-xl"
      } mx-auto`}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      <SearchInput
        value={keyword}
        onChange={setKeyword}
        onSearch={onSearch}
        variant={variant}
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full w-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow box-border z-50 overflow-hidden">
          {suggestions.map((s, i) => (
            <li
              key={`${s.type}-${s.label}-${i}`}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onPointerDown={() => onPick(s)}
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
