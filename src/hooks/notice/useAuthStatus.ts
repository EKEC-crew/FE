// hooks/useAuthStatus.ts
import { useQuery } from "@tanstack/react-query";
import { privateAPI } from "../../apis/axios";

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      try {
        const { data } = await privateAPI.get("/auth/me", {
          withCredentials: true,
        });
        return {
          isLoggedIn: data?.resultType === "SUCCESS",
          user: data?.data ?? null,
        };
      } catch (e: any) {
        if (e?.response?.status === 401)
          return { isLoggedIn: false, user: null };
        return { isLoggedIn: false, user: null };
      }
    },
    staleTime: 60_000,
    retry: false,
  });
};
