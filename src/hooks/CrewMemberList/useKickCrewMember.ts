// src/hooks/useCrewMember/useKickCrewMember.ts
import { kickCrewMember } from "../../apis/crewMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useKickCrewMember = (crewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => kickCrewMember(crewId, memberId),
    onSuccess: () => {
      // 멤버 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["crewMembers", crewId] });
    },
    onError: (error) => {
      console.error("멤버 방출 중 오류 발생:", error);
      alert("멤버 방출에 실패했습니다.");
    },
  });
};
