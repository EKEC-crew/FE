import type { CrewFilter } from "../../components/crewList/CrewFilterBar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseNumberArray = (value: string | null): number[] => {
  return value ? value.split(",").map(Number) : [];
};

interface UseSyncFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<CrewFilter>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<number>>;
  setHeadcount: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useFilterSync = ({
  setFilters,
  setPage,
  setSort,
  setHeadcount,
}: UseSyncFiltersProps) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setFilters({
      category: parseNumberArray(params.get("category")),
      activity: parseNumberArray(params.get("activity")),
      style: parseNumberArray(params.get("style")),
      regionSido: params.get("regionSido") || "",
      regionGu: params.get("regionGu") || "",
      age: params.get("age") ? Number(params.get("age")) : null,
      gender: params.get("gender") ? Number(params.get("gender")) : null,
    });

    const pageParam = params.get("page");
    setPage(pageParam ? Number(pageParam) : 1);

    const sortParam = params.get("sort");
    setSort(sortParam ? Number(sortParam) : 1);

    setHeadcount(null);
  }, [location.search]);
};
