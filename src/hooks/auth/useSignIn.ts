import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signInApi, refreshApi } from "../../apis/auth";
import type { RequestSign, ResponseSign } from "../../types/auth/types";
import { useAuthStore } from "../../store/useAuthStore";
import { useErrorModal } from "./useErrorModal";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { showSignUpPromptModal, showPasswordErrorModal } = useErrorModal();

  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  return useMutation<ResponseSign, Error, RequestSign>({
    mutationFn: signInApi,
    onSuccess: async (response) => {
      console.log("로그인 성공:", response);

      if (response.resultType === "SUCCESS") {
        try {
          const me = await refreshApi();
          if (me.resultType === "SUCCESS" && me.data) {
            setUser(me.data);
            setStatus("authenticated");
            await useAuthStore.getState().loadAvatar();
          } else {
            setUser(null);
            setStatus("unauthenticated");
          }
        } catch {
          setUser(null);
          setStatus("unauthenticated");
        }
        if (response.data?.isCompleted) {
          navigate("/");
        } else {
          navigate("/createProfile");
        }
      } else {
        console.error("로그인 실패:", response.error);
        throw new Error(response.error?.reason || "로그인에 실패했습니다.");
      }
    },
    onError: (error: any) => {
      console.error("로그인 오류:", error);

      // Axios 에러 응답 구조 확인
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;

        if (status === 404) {
          // 404 에러: 회원가입 유도 모달
          showSignUpPromptModal();
          return;
        } else if (status === 400) {
          // 400 에러에서 errorCode가 I001인지 확인 (비밀번호 오류)
          if (errorData?.error?.errorCode === "I001") {
            showPasswordErrorModal();
            return;
          }
        }
      }

      // 기타 에러는 alert 처리
      let errorMessage = "로그인 중 오류가 발생했습니다.";

      alert(errorMessage);
    },
  });
};
