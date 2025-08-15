import type { CrewFilters } from "../../types/crewFilter/crew";

export function filtersAreEmpty(
  f:
    | CrewFilters
    | {
        category: number[];
        activity: number[];
        style: number[];
        regionSido: string;
        regionGu: string;
        age: number | null;
        gender: number | null;
      }
) {
  const catEmpty = Array.isArray(f.category)
    ? f.category.length === 0
    : f.category == null; // number|null일 때는 null/undefined만 빈 값으로 취급

  return (
    catEmpty &&
    f.activity.length === 0 &&
    f.style.length === 0 &&
    !f.regionSido &&
    !f.regionGu &&
    f.age == null &&
    f.gender == null
  );
}
