import { useCallback, useEffect, useMemo, useState } from "react";
import CrewCardList from "../../components/crewList/CrewCardList";
import CrewFilterBar from "../../components/crewList/CrewFilterBar";
import CrewSortBar from "../../components/crewList/CrewSortBar";
import Pagination from "../../components/crewList/Pagination";
import cautionIcon from "../../assets/icons/img_graphic_320.svg";
import type { CrewFilter } from "../../components/crewList/CrewFilterBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilterSync } from "../../hooks/crewList/useFilterSync";
import { filtersAreEmpty } from "../../utils/crewFilter/filtersAreEmpty";
import { useCrewSearchDetail } from "../../hooks/crewList/useCrewSearchDetail";
import { buildDetailQS } from "../../utils/crewFilter/buildCrewListQs";
import { useInternalSetters } from "../../hooks/crewList/useInternalSetters";
import { useUrlSync } from "../../hooks/crewList/useUrlSync";

const PAGE_SIZE = 10;

const CrewListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState<CrewFilter>({
    category: [],
    activity: [],
    style: [],
    regionSido: "",
    regionGu: "",
    age: null,
    gender: null,
    regionIds: [],
  });

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(2);
  const [name, setName] = useState<string>("");
  const [headcount, setHeadcount] = useState<number | null>(null);

  const [hydrated, setHydrated] = useState(false);

  // 내부 변경 인지 훅
  const { flagRef: internalChangeRef, wrap } = useInternalSetters();

  const setFiltersI = useCallback(wrap(setFilters), [wrap, setFilters]);
  const setSortI = useCallback(wrap(setSort), [wrap, setSort]);
  const setHeadcountI = useCallback(wrap(setHeadcount), [wrap, setHeadcount]);
  const setPageI = useCallback(wrap(setPage), [wrap, setPage]);

  // URL -> 상태 (초기/ 뒤로가기)
  useFilterSync({
    setFilters,
    setPage,
    setSort,
    setHeadcount,
    setName,
    onHydrated: () => setHydrated(true),
  });

  // 상태 → URL (replace)
  const qs = useMemo(
    () =>
      buildDetailQS({
        page,
        sort,
        name,
        category: filters.category,
        activity: filters.activity,
        style: filters.style,
        regionSido: filters.regionSido || undefined,
        regionGu: filters.regionGu || undefined,
        regionIds: filters.regionIds,
        age: filters.age ?? undefined,
        gender: filters.gender ?? undefined,
        capacity: headcount ?? undefined,
      }),
    [page, sort, name, filters, headcount]
  );

  useUrlSync({
    hydrated,
    locationSearch: location.search,
    navigate: (path: string, opts: { replace: boolean }) =>
      navigate(path, opts),
    qs,
    isInternalRef: internalChangeRef,
  });

  // 데이터 가져오기 (react-query)
  const { data } = useCrewSearchDetail({
    name,
    category: filters.category,
    activity: filters.activity,
    style: filters.style,
    regionSido: filters.regionSido || undefined,
    regionGu: filters.regionGu || undefined,
    regionIds: filters.regionIds,
    age: filters.age,
    gender: filters.gender,
    capacity: headcount,
    page,
    sort,
  });

  const crews = data?.crews ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // 필터 변경 시 페이지 1로 초기화
  useEffect(() => {
    if (page !== 1) setPageI(1);
  }, [filters, sort, headcount]);

  // 페이지 범위 보정
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [qs]);

  const handleReset = () => {
    setFiltersI({
      category: [],
      activity: [],
      style: [],
      regionSido: "",
      regionGu: "",
      regionIds: [],
      age: null,
      gender: null,
    });
    setHeadcount(null);
    setSort(2); // 활동 많은 순
    setPage(1);
    setName("");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[150px] pt-30 pb-20">
        {/* 헤더 */}
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">
          {!name && filtersAreEmpty(filters) && page === 1 && sort === 2
            ? "맞춤 크루를 찾아보세요!"
            : name
              ? `‘${name}’ 검색 결과`
              : "맞춤 크루를 찾아봤어요!"}
        </h2>

        {/* 필터 옵션 */}
        <CrewFilterBar
          filters={filters}
          setFilters={setFiltersI}
          onReset={handleReset}
        />

        {/* 크루 개수 + 정렬 옵션 */}
        <CrewSortBar
          sort={sort}
          setSort={setSortI}
          headcount={headcount}
          setHeadcount={setHeadcountI}
          totalCount={totalCount}
        />

        {/* 카드 리스트 */}
        {crews.length === 0 ? (
          <div className="text-center mt-40">
            <img src={cautionIcon} alt="successIcon" className="mx-auto" />
            <h3 className="text-xl md:text-2xl font-bold">
              일치하는 크루가 없어요!
            </h3>
          </div>
        ) : (
          <CrewCardList crews={crews} />
        )}

        {/* 페이지네이션 */}
        {crews.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPageI}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CrewListPage;
