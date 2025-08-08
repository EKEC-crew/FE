import type { CrewFilters } from "../../types/crewFilter/crew";

export const buildFilterQuery = (filters: CrewFilters): string => {
  const query = new URLSearchParams();

  if (filters.category !== null)
    query.append("category", String(filters.category));
  if (filters.activity.length > 0)
    query.append("activity", filters.activity.join(","));
  if (filters.style.length > 0) query.append("style", filters.style.join(","));
  if (filters.regionSido) query.append("regionSido", filters.regionSido);
  if (filters.regionGu) query.append("regionGu", filters.regionGu);
  if (filters.age !== null) query.append("age", String(filters.age));
  if (filters.gender !== null) query.append("gender", String(filters.gender));

  query.append("page", "1");
  query.append("sort", "2");

  return query.toString();
};
