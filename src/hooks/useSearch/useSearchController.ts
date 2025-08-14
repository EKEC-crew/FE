import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TAG_INDEX, type TagKind } from "../../constants/searchTags";
import { fetchCrewNameSuggestions } from "../../apis/search";

export type Suggestion =
  | { type: "crew"; label: string }
  | { type: "tag"; label: string; id: number; kind: TagKind };

const MAX_SUGGESTIONS = 8;

function useDebouncedValue<T>(value: T, delay = 150) {
  const [v, setV] = useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default function useSearchController() {
  const [keyword, setKeyword] = useState("");
  const debounced = useDebouncedValue(keyword, 150);
  const navigate = useNavigate();

  const key = ["crew-name-auto", debounced] as const;

  const { data: crewNames = [] } = useQuery<
    string[], // TQueryFnData (queryFn 반환)
    Error, // TError
    string[], // TData (select 안 쓰면 동일)
    typeof key // TQueryKey
  >({
    queryKey: key,
    queryFn: ({ signal }) =>
      fetchCrewNameSuggestions(debounced.trim(), signal, 5),
    enabled: debounced.trim().length >= 1 && !debounced.trim().startsWith("#"),
    staleTime: 10_000,
    placeholderData: keepPreviousData,
  });
  // 태그 자동완성 (항상 위에)
  const tagSuggestions: Suggestion[] = useMemo(() => {
    const q = debounced.trim().replace(/^#/, "");
    if (!q) return [];
    return TAG_INDEX.filter((t) => t.label.includes(q))
      .slice(0, 5)
      .map((t) => ({
        type: "tag" as const,
        label: `#${t.label}`,
        id: t.id,
        kind: t.kind,
      }));
  }, [debounced]);

  // 크루명 제안
  const crewSuggestions: Suggestion[] = useMemo(
    () => crewNames.map((n: string) => ({ type: "crew" as const, label: n })),
    [crewNames]
  );

  // 합치기
  const suggestions = useMemo(
    () => [...tagSuggestions, ...crewSuggestions].slice(0, MAX_SUGGESTIONS),
    [tagSuggestions, crewSuggestions]
  );

  // 검색 (엔터/돋보기)
  const handleSearch = () => {
    const q = keyword.trim();
    if (!q) return;
    const first = suggestions[0];
    if (q.startsWith("#") && first?.type === "tag") {
      handleSuggestionClick(first);
      return;
    }
    navigate(`/crewListPage?name=${encodeURIComponent(q)}&page=1&sort=2`);
  };

  // 자동완성 클릭 시 이동
  const handleSuggestionClick = (s: Suggestion) => {
    if (s.type === "crew") {
      navigate(
        `/crewListPage?name=${encodeURIComponent(s.label)}&page=1&sort=2`
      );
      return;
    }
    const key =
      s.kind === "category"
        ? "category"
        : s.kind === "activity"
          ? "activity"
          : "style";
    navigate(`/crewListPage?${key}=${s.id}&page=1&sort=2`);
  };

  return {
    keyword,
    setKeyword,
    suggestions,
    handleSearch,
    handleSuggestionClick,
  };
}
