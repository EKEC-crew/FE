import { useCallback } from "react";
import type { Suggestion } from "../useSearch/useSearchController";

export default function useSearchHotKeys(
  open: boolean,
  suggestions: Suggestion[],
  activeIndex: number,
  setActiveIndex: (i: number) => void,
  onPick: (s: Suggestion) => void,
  onSearchFallback: () => void
) {
  return useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || suggestions.length === 0) return;

      if (e.key === "ArrowDown" || e.key === "Down") {
        e.preventDefault();
        setActiveIndex((activeIndex + 1) % suggestions.length);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "Up") {
        e.preventDefault();
        setActiveIndex(
          (activeIndex - 1 + suggestions.length) % suggestions.length
        );
        return;
      }
      if (e.key === "Enter") {
        if (activeIndex >= 0) {
          e.preventDefault();
          onPick(suggestions[activeIndex]);
        } else {
          onSearchFallback();
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        // Escape는 상위에서 open=false 처리(선택)
      }
    },
    [open, suggestions, activeIndex, setActiveIndex, onPick, onSearchFallback]
  );
}
