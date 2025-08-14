// src/hooks/useApplicationDetail.ts
import { useQuery } from "@tanstack/react-query";
import { getApplyDetail /*, getApplyInit*/ } from "../../apis/crewApply";
import { useApplyInit } from "./useCustomQusetion"; // 기존 훅 그대로 사용

export const useApplicationDetail = (crewId: number, applyId: number) => {
  const detailQuery = useQuery({
    queryKey: ["applyDetail", crewId, applyId],
    queryFn: () => getApplyDetail(crewId, applyId),
    enabled: Number.isFinite(crewId) && Number.isFinite(applyId),
    retry: false,
  });

  // init도 API로 분리하고 싶으면 useApplyInit 내부 fetcher를 getApplyInit으로 교체
  const initQuery = useApplyInit(crewId);

  return { detailQuery, initQuery };
};
