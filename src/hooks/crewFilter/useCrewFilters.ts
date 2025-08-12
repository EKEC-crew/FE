import type { CrewFilters } from "../../types/crewFilter/crew";
import { useState } from "react";

export const useCrewFilters = () => {
  const [filters, setFilters] = useState<CrewFilters>({
    category: null,
    activity: [],
    style: [],
    regionSido: "",
    regionGu: "",
    age: null,
    gender: null,
  });

  const isFilterSelected = (): boolean => {
    const { category, activity, style, regionSido, regionGu, age, gender } =
      filters;
    return (
      category !== null ||
      activity.length > 0 ||
      style.length > 0 ||
      regionSido !== "" ||
      regionGu !== "" ||
      age !== null ||
      gender !== null
    );
  };

  return {
    filters,
    setFilters,
    isFilterSelected,
  };
};
