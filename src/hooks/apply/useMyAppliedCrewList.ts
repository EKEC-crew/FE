// src/hooks/apply/useAppliedCrewList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getAppliedCrewList,
  type GetAppliedListParams,
} from "../../apis/crewApply";
import type { AppliedCrew } from "../../types/mypage/AppliedCrew";
import type { AppliedListSuccess } from "../../types/apply/types"; // 타입 import
import { useMemo } from "react";

const PAGE_SIZE = 10;

export function useMyAppliedCrewList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<AppliedListSuccess, Error>({
    queryKey: ["appliedCrewList", "infinite"],
    queryFn: ({ pageParam }) =>
      getAppliedCrewList({ page: pageParam as number, size: PAGE_SIZE }),
    initialPageParam: 1, // ✅ 필수 속성 추가
    getNextPageParam: (lastPage, allPages) => {
      // 더 불러올 데이터가 있으면 다음 페이지 번호 반환
      if (lastPage.items.length < PAGE_SIZE) {
        return undefined; // 더 이상 페이지 없음
      }
      return allPages.length + 1;
    },
    staleTime: 1000 * 60, // 1분
  });

  // 모든 페이지의 데이터를 하나의 배열로 합치기
  const appliedCrews: AppliedCrew[] = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.items.map((item) => ({
          id: item.applyId,
          name: item.crewName,
          description: item.crewContent ?? "",
          imageUrl: item.crewImage
            ? `https://api.ekec.site/api/image/?type=0&fileName=${item.crewImage}`
            : "",
          status: item.statusLabel as AppliedCrew["status"],
          crewId: item.crewId,
          applyId: item.applyId,
          appliedAt: item.appliedAt,
        }))
      ) ?? []
    );
  }, [data]);

  return {
    crews: appliedCrews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
}
