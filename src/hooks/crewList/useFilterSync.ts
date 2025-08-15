import { serverRegions } from "../../constants/serverRegions";
import type { CrewFilter } from "../../components/crewList/CrewFilterBar";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const parseNumberArray = (v: string | null): number[] =>
  v
    ? v
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map(Number)
        .filter((n) => Number.isFinite(n))
    : [];

const arraysEqual = (a: number[], b: number[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

const filtersShallowEqual = (a: CrewFilter, b: CrewFilter) =>
  arraysEqual(a.category, b.category) &&
  arraysEqual(a.activity, b.activity) &&
  arraysEqual(a.style, b.style) &&
  arraysEqual(a.regionIds ?? [], b.regionIds ?? []) &&
  a.regionSido === b.regionSido &&
  a.regionGu === b.regionGu &&
  a.age === b.age &&
  a.gender === b.gender;

// id -> 라벨
const idToRegion: Record<number, { sido: string; gu: string }> =
  Object.fromEntries(
    serverRegions.map((r) => [r.id, { sido: r.sido, gu: r.goo }])
  );

interface UseSyncFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<CrewFilter>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<number>>;
  setHeadcount: React.Dispatch<React.SetStateAction<number | null>>;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  // 초기 URL -> 상태 동기화가 끝났음을 알림
  onHydrated?: () => void;
}

// URL -> 상태
export const useFilterSync = ({
  setFilters,
  setPage,
  setSort,
  setHeadcount,
  setName,
  onHydrated,
}: UseSyncFiltersProps) => {
  const location = useLocation();

  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);

    const regionIds = parseNumberArray(params.get("region"));
    let regionSidoLabel = params.get("regionSido") || "";
    let regionGuLabel = params.get("regionGu") || "";

    const regionParam = params.get("region");
    if (regionParam && /^\d+$/.test(regionParam)) {
      const rec = idToRegion[Number(regionParam)];
      if (rec) {
        regionSidoLabel = rec.sido;
        regionGuLabel = rec.gu;
      } else {
        // 알 수 없는 region id면 비워둠 (필요시 기본값 지정 가능)
        regionSidoLabel = "";
        regionGuLabel = "";
      }
    }

    const nextFilters: CrewFilter = {
      category: parseNumberArray(params.get("category")),
      activity: parseNumberArray(params.get("activity")),
      style: parseNumberArray(params.get("style")),
      regionIds,
      regionSido: "",
      regionGu: "",
      age: params.get("age") ? Number(params.get("age")) : null,
      gender: params.get("gender") ? Number(params.get("gender")) : null,
    };

    setFilters((prev) =>
      filtersShallowEqual(prev, nextFilters) ? prev : nextFilters
    );

    const nextPage = params.get("page") ? Number(params.get("page")) : 1;
    setPage((prev) => (prev === nextPage ? prev : nextPage));

    const nextSort = params.get("sort") ? Number(params.get("sort")) : 2;
    setSort((prev) => (prev === nextSort ? prev : nextSort));

    const cap = params.get("capacity");
    const nextHead = cap ? Number(cap) : null;
    setHeadcount((prev) => (prev === nextHead ? prev : nextHead));

    const nextName = params.get("name") ?? "";
    setName?.((prev) => (prev === nextName ? prev : nextName));

    onHydrated?.();
  }, [location.search]);
};
