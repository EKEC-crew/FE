import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CrewMemberRole } from "../../apis/crewRole";

export const useCrewRole = (crewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      currentRole,
    }: {
      memberId: number;
      currentRole: number;
    }) => CrewMemberRole(crewId, memberId, currentRole === 1 ? 0 : 1), // 1이면 제외, 0이면 승격

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crewMembers", crewId] }); // 리스트 갱신
    },
  });
};
