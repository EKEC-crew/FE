import { API } from "../../apis/axios";
import { useQuery } from "@tanstack/react-query";

const fetchCrewMembers = async (crewId: number, page: number, size: number) => {
  const res = await API.get(`/crew/${crewId}/member/`, {
    params: { page, size },
  });
  console.log("크루멤버 리스트 데이터 ", res.data); //디버깅 코드
  return res.data.data ?? [];
};

export const useCrewMembers = (
  crewId: number,
  page: number = 1,
  size: number = 24
) => {
  return useQuery({
    queryKey: ["crewMembers", crewId, page, size],
    queryFn: () => fetchCrewMembers(crewId, page, size),
    enabled: !!crewId,
  });
};
