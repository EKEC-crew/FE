// hooks/useAuthStatus.ts
import { useQuery } from "@tanstack/react-query";
import { privateAPI } from "../../apis/axios";

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
    try {
      // 1) /auth/me가 있으면 이걸 권장
      const { data } = await privateAPI.get("/auth/me", { withCredentials: true });
      return { isLoggedIn: data?.resultType === "SUCCESS", user: data?.data ?? null };
    } catch (e: any) {
      // 2) 없으면 refresh로 대체 (필요시 주석 해제해서 사용)
      // const { data } = await privateAPI.post("/auth/refresh", {}, { withCredentials: true });
      // return { isLoggedIn: data?.resultType === "SUCCESS", user: data?.data ?? null };

      if (e?.response?.status === 401) return { isLoggedIn: false, user: null };
      return { isLoggedIn: false, user: null };
    }
    },
    staleTime: 60_000,
    retry: false,
  });
};
