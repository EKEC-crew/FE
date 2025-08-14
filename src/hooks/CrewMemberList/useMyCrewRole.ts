// hooks/useMyCrewRole.ts
import { useQuery } from "@tanstack/react-query";
import { privateAPI } from "../../apis/axios";
import type { CrewRole } from "../../types/detail/crewMember";

export function useMyCrewRole(crewId: number) {
  return useQuery({
    queryKey: ["myCrewRole", crewId],
    queryFn: async () => {
      const res = await privateAPI.get(`/crew/${crewId}/myrole/`);
      return res.data?.data?.role as CrewRole;
    },
    enabled: !!crewId,
  });
}
