import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../../apis/schedule";
import type { ResponseGetComments } from "../../types/detail/schedule/types";

export const useGetComments = (
  crewId: string,
  planId: string,
  page: number = 1,
  size: number = 10
) => {
  return useQuery<ResponseGetComments>({
    queryKey: ["comments", crewId, planId, page, size],
    queryFn: () => getCommentsApi(crewId, planId, page, size),
    enabled: !!crewId && !!planId,
    staleTime: 1000 * 60 * 5, // 5분간 신선한 데이터로 간주
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  });
};
