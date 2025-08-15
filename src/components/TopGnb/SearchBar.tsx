import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import useSearchController, {
  type Suggestion,
} from "../../hooks/useSearch/useSearchController";
import { useCategoryStore } from "../../store/categoryStore";
import { buildFreshQS } from "../../utils/crewFilter/buildCrewListQs";
import SuggestList from "./SuggestList";
import useCompactVisibility from "../../hooks/gnb/useCompactVisibility";
import useSearchHotKeys from "../../hooks/gnb/useSearchHotKeys";

interface Props {
  variant: "large" | "compact";
}

export default function SearchBar({ variant }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visible = useCompactVisibility(variant, location.pathname);
  const [open, setOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const activeItemRef = useRef<HTMLLIElement | null>(null);

  const { selectedCategory, setCategory } = useCategoryStore();
  const { keyword, setKeyword, suggestions } = useSearchController();

  useEffect(() => {
    if (location.pathname === "/searchPage" && selectedCategory)
      setKeyword(selectedCategory);
    if (location.pathname === "/") {
      setCategory("");
      setKeyword("");
    }
  }, [location.pathname, selectedCategory, setCategory, setKeyword]);

  useEffect(() => {
    const shouldOpen =
      hasFocus && Boolean(keyword.trim()) && suggestions.length > 0;
    setOpen(shouldOpen);
    if (!shouldOpen) setActiveIndex(-1);
  }, [hasFocus, keyword, suggestions]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [keyword]);

  // 라우트 변경 시 닫기
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (activeItemRef.current)
      activeItemRef.current.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onFocusCapture = () => setHasFocus(true);
  const onBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !e.currentTarget.contains(next)) setHasFocus(false);
  };

  // 이름만 OR 태그 하나만
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

  const onInputKeyDown = useSearchHotKeys(
    open,
    suggestions,
    activeIndex,
    setActiveIndex,
    onPick,
    onSearch
  );

  if (!visible) return null;

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
        onKeyDown={onInputKeyDown}
        variant={variant}
      />
      <SuggestList
        open={open}
        suggestions={suggestions}
        activeIndex={activeIndex}
        onPick={onPick}
      />
    </div>
  );
}
