import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Suggestion } from "./types";
import { cleanKeyword, filterSuggestions } from "./filterSuggestions";

// 예시 더미
const dummySuggestions: Suggestion[] = [
  { type: "tag", label: "#스포츠" },
  { type: "tag", label: "#스포츠 직관" },
  { type: "crew", label: "스파게티 크루" },
  { type: "crew", label: "스피트 러닝" },
  { type: "crew", label: "스케치 모임" },
];

function useSearchController() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 경로가 바뀔 때 검색 상태 초기화하기!!!
    setKeyword("");
    setSuggestions([]);
  }, [location.pathname]);

  useEffect(() => {
    if (keyword.trim().length >= 1) {
      setSuggestions(filterSuggestions(dummySuggestions, keyword));
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?query=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleSuggestionClick = (label: string) => {
    const cleaned = cleanKeyword(label);
    setKeyword(cleaned);
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(cleaned)}`);
  };

  return {
    keyword,
    setKeyword,
    suggestions,
    handleSearch,
    handleSuggestionClick,
  };
}

export default useSearchController;
