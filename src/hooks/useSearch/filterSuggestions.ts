import type { Suggestion } from "./types";

export const filterSuggestions = (
  suggestions: Suggestion[],
  keyword: string
): Suggestion[] => {
  return suggestions.filter((s) =>
    s.label.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const cleanKeyword = (label: string): string => {
  return label.replace(/^#/, "");
};
