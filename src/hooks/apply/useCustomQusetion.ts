// src/hooks/apply/useApplyInit.ts
import { useQuery } from "@tanstack/react-query";
import { getApplyInit } from "../../apis/crewApply";
import type { CommonAnswers, ApiStep1 } from "../../types/apply/types";

const toCommonAnswers = (s: ApiStep1): CommonAnswers => ({
  categoryId: s.category,
  activityList: s.activities,
  styleList: s.styles,
  region: s.region,
  age: s.age,
  gender: s.gender,
});

export const useApplyInit = (crewId: number) => {
  return useQuery({
    enabled: !!crewId,
    queryKey: ["applyInit", crewId],
    queryFn: () => getApplyInit(crewId),
    select: (success) => ({
      step1: toCommonAnswers(success.step1), // ✅ CommonQuestion 초기값/제약에 그대로 사용
      step2: success.step2, // (지금은 안 씀)
      recruitMessage: success.recruitMessage,
      rawStep1: success.step1, // 필요시 원본도 함께
    }),
  });
};
