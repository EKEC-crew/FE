// hooks/useCrewMembers.ts
import { getCrewMembers } from "../../apis/crewMember";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCrewMembers(crewId: number) {
  return useQuery({
    queryKey: ["crewMembers", crewId],
    queryFn: () => getCrewMembers(crewId),
    enabled: !!crewId,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) {
          return false; // 4xx 에러는 재시도하지 않음
        }
      }
      return failureCount < 3;
    },
  });
}
