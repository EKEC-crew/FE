// src/hooks/apply/useApplyInit.ts
import { useQuery } from "@tanstack/react-query";
import { getApplyInit } from "../../apis/crewApply";
import type { CommonAnswers, ApiStep1 } from "../../types/apply/types";
import { mapServerRegionsToOptions } from "../../utils/apply/mappingRegions";

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
    select: (success) => {
      const regionOptions = mapServerRegionsToOptions(); // ✅ 매핑
      return {
        step1: toCommonAnswers(success.step1),
        step2: success.step2,
        recruitMessage: success.recruitMessage,
        rawStep1: success.step1,
        regionOptions, // ✅ 여기서 바로 포함
      };
    },
  });
};
