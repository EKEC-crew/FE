import { useEffect, useRef } from "react";
import type { Suggestion } from "../../hooks/useSearch/useSearchController";

interface Props {
  open: boolean;
  suggestions: Suggestion[];
  activeIndex: number;
  onPick: (s: Suggestion) => void;
}

export default function SuggestList({
  open,
  suggestions,
  activeIndex,
  onPick,
}: Props) {
  const activeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (activeRef.current)
      activeRef.current.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open || suggestions.length === 0) return null;

  return (
    <ul
      id="search-suggestions"
      role="listbox"
      className="absolute top-full w-full left-0 mt-1 max-h-72 overflow-auto bg-white border border-gray-300 rounded-lg shadow box-border z-50"
    >
      {suggestions.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <li
            key={`${s.type}-${s.label}-${i}`}
            role="option"
            aria-selected={isActive}
            ref={isActive ? activeRef : null}
            className={`px-4 py-2 text-sm cursor-pointer ${
              isActive ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            // 첫 클릭 blur 방지
            onMouseDown={(e) => {
              e.preventDefault();
              onPick(s);
            }}
          >
            {s.type === "tag" ? (
              <span className="text-blue-500">{s.label}</span>
            ) : (
              <span>{s.label}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
