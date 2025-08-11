import { useQuery } from "@tanstack/react-query";
import { getScheduleListApi } from "../../apis/schedule";
import type { ResponseScheduleList } from "../../types/detail/schedule/types";

export const useScheduleList = (
  crewId: string,
  page: number = 1,
  size: number = 10
) => {
  return useQuery<ResponseScheduleList, Error>({
    queryKey: ["scheduleList", crewId, page, size],
    queryFn: () => getScheduleListApi(crewId, page, size),
    enabled: !!crewId, // crewId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 신선하다고 간주
    retry: 1,
  });
};
