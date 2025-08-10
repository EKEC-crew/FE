import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signOutApi } from "../../apis/auth";
import type { ResponseSignOut } from "../../types/auth/types";
import { useAuthStore } from "../../store/useAuthStore";

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  return useMutation<ResponseSignOut, Error>({
    mutationFn: signOutApi,
    onMutate: () => {
      setUser(null);
      setStatus("unauthenticated");
      queryClient.clear();
    },
    onSuccess: (response) => {
      console.log("로그아웃 응답:", response);

      if (response.resultType === "SUCCESS") {
        localStorage.clear();
        sessionStorage.clear();

        navigate("/");
      } else {
        console.error("로그아웃 실패:", response.error);
        alert(response.error?.reason || "로그아웃에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    },
  });
};
