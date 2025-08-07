import { getCrewMembers } from "../../apis/crewMember";

import { useQuery } from "@tanstack/react-query";

export const useCrewMembers = (crewId: number) => {
  return useQuery({
    queryKey: ["crewMembers", crewId],
    queryFn: () => getCrewMembers(crewId),
    enabled: !!crewId,
  });
};
