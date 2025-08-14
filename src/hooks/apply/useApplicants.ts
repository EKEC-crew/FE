// src/features/applicants/hooks/useApplicants.ts
import { getApplicants } from "../../apis/crewApply";
import type { ApplicantsAll } from "../../types/apply/types";
import { mapApplicants } from "../../utils/mappers/applicantsMapper";
import { useQuery } from "@tanstack/react-query";

export function useApplicants(crewId: number) {
  return useQuery<ApplicantsAll>({
    queryKey: ["applicants-all", crewId],
    queryFn: async () => {
      const dto = await getApplicants(crewId);
      return mapApplicants(dto);
    },
    enabled: !!crewId,
    staleTime: 5 * 60 * 1000,
  });
}
