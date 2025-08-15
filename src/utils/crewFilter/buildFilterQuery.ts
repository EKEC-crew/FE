import type { CrewFilters } from "../../types/crewFilter/crew";
import { getRegionId } from "../regions";

export const buildFilterQuery = (filters: CrewFilters): string => {
  const sp = new URLSearchParams();

  sp.set("page", "1");
  sp.set("sort", "2");

  if (filters.category !== null) sp.set("category", String(filters.category));
  if (filters.activity.length > 0)
    sp.set("activity", filters.activity.join(","));
  if (filters.style.length > 0) sp.set("style", filters.style.join(","));

  // regionIds 우선
  if (filters.regionIds && filters.regionIds.length > 0) {
    sp.set("region", filters.regionIds.join(","));
  } else if (filters.regionSido && filters.regionGu) {
    const id = getRegionId(filters.regionSido, filters.regionGu);
    if (id != null) sp.set("region", String(id));
  }

  if (filters.age !== null) sp.set("age", String(filters.age));
  if (filters.gender !== null) sp.set("gender", String(filters.gender));

  return sp.toString();
};
