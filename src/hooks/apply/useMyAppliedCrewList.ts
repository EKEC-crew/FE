// src/hooks/apply/useAppliedCrewList.ts
import { useQuery } from "@tanstack/react-query";
import {
  getAppliedCrewList,
  type GetAppliedListParams,
} from "../../apis/crewApply";

export function useMyAppliedCrewList(params?: GetAppliedListParams) {
  return useQuery({
    queryKey: ["appliedCrewList", params?.page ?? 1, params?.size ?? 20],
    queryFn: () => getAppliedCrewList(params),
    staleTime: 1000 * 60, // 1분
  });
}
