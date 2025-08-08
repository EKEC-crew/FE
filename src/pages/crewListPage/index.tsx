import { useEffect, useState } from "react";
import CrewCardList from "../../components/crewList/CrewCardList";
import CrewFilterBar from "../../components/crewList/CrewFilterBar";
import CrewSortBar from "../../components/crewList/CrewSortBar";
import Pagination from "../../components/crewList/Pagination";
import type { CrewFilter } from "../../components/crewList/CrewFilterBar";
import { useLocation } from "react-router-dom";
import type { Crew } from "../../types/crewCreate/crew";
import { API } from "../../apis/axios";

const CrewListPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const parseNumberArray = (value: string | null): number[] => {
    return value ? value.split(",").map(Number) : [];
  };

  // filters 초기화
  const [filters, setFilters] = useState<CrewFilter>({
    category: parseNumberArray(params.get("category")),
    activity: parseNumberArray(params.get("activity")),
    style: parseNumberArray(params.get("style")),
    regionSido: params.get("regionSido") || "",
    regionGu: params.get("regionGu") || "",
    age: params.get("age") ? Number(params.get("age")) : null,
    gender: params.get("gender") ? Number(params.get("gender")) : null,
  });

  const [page, setPage] = useState(() => {
    const pageParam = params.get("page");
    return pageParam ? Number(pageParam) : 1;
  });

  const [sort, setSort] = useState(() => {
    const sortParam = params.get("sort");
    return sortParam ? Number(sortParam) : 1;
  });

  const [headcount, setHeadcount] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(false);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);

  // 쿼리 파라미터 생성
  const buildQueryParams = (
    filters: CrewFilter,
    page: number,
    sort: number,
    headcount: number | null
  ) => {
    const queryParams = new URLSearchParams();

    if (filters.category.length > 0)
      queryParams.append("category", filters.category.join(","));
    if (filters.activity.length > 0)
      queryParams.append("activity", filters.activity.join(","));
    if (filters.style.length > 0)
      queryParams.append("style", filters.style.join(","));
    if (filters.regionSido)
      queryParams.append("regionSido", filters.regionSido);
    if (filters.regionGu) queryParams.append("regionGu", filters.regionGu);
    if (filters.age !== null) queryParams.append("age", filters.age.toString());
    if (filters.gender !== null)
      queryParams.append("gender", filters.gender.toString());
    if (headcount !== null)
      queryParams.append("headcount", headcount.toString());

    queryParams.append("page", page.toString());
    queryParams.append("sort", sort.toString());

    return queryParams;
  };

  // 크루 데이터 불러오기
  const fetchCrews = async () => {
    try {
      const queryParams = buildQueryParams(filters, page, sort, headcount);
      const response = await API.get("/crew/search/detail", {
        params: queryParams,
      });

      console.log("응답 전체 구조 확인", response.data);

      const { crews, totalPages } = response.data.data;
      setCrews(crews);
      setTotalPages(totalPages);
      setTotalCount(crews.length);
    } catch (err) {
      console.error("크루 불러오기 실패", err);
    }
  };

  useEffect(() => {
    setPage(1); // 필터가 바뀔 때 페이지를 1로 초기화
  }, [filters, sort, headcount]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    fetchCrews();
  }, [filters, page, sort, headcount]);

  const handleReset = () => {
    setFilters({
      category: [],
      activity: [],
      style: [],
      regionSido: "",
      regionGu: "",
      age: null,
      gender: null,
    });
    setSort(1);
    setHeadcount(null);
    setResetSignal((prev) => !prev); // 리셋 트리거 변경
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[150px] pt-30 pb-20">
        {/* 헤더 */}
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">
          맞춤 크루를 찾아보세요!
        </h2>

        {/* 필터 옵션 */}
        <CrewFilterBar
          filters={filters}
          setFilters={setFilters}
          fetchCrews={fetchCrews}
          onReset={handleReset}
        />

        {/* 크루 개수 + 정렬 옵션 */}
        <CrewSortBar
          sort={sort}
          setSort={setSort}
          headcount={headcount}
          setHeadcount={setHeadcount}
          totalCount={totalCount}
          resetSignal={resetSignal}
        />

        {/* 카드 리스트 */}
        <CrewCardList crews={crews} />

        {/* 페이지네이션 */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CrewListPage;
