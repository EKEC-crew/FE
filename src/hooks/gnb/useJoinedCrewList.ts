// src/hooks/crew/useJoinedCrewList.ts
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "../../store/useAuthStore";
import { fetchJoinedCrews } from "../../apis/upcomming";

export function useJoinedCrewList() {
  const { user } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["joinedCrewList"],
    queryFn: fetchJoinedCrews,
    enabled: !!user, // 로그인된 상태에서만 실행
    staleTime: 5 * 60 * 1000,
  });

  const crewNames = data?.map((crew) => crew.crewName) ?? [];
  const crews = data ?? [];

  return {
    crewNames,
    crews,
    totalCount: crews.length,
    isLoading,
    isError,
    error,
  };
}
