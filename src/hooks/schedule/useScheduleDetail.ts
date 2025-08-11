import { useQuery } from "@tanstack/react-query";
import { getScheduleDetailApi } from "../../apis/schedule";
import type { ResponseScheduleDetail } from "../../types/detail/schedule/types";

export const useScheduleDetail = (crewId: string, planId: string) => {
  return useQuery<ResponseScheduleDetail, Error>({
    queryKey: ["scheduleDetail", crewId, planId],
    queryFn: () => getScheduleDetailApi(crewId, planId),
    enabled: !!crewId && !!planId, // crewId와 planId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 신선하다고 간주
    retry: 1,
  });
};
