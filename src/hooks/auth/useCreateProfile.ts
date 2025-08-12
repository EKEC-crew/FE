import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { refreshApi, createProfileApi } from "../../apis/auth";
import type {
  ResponseRefresh,
  ResponseCreateProfile,
  RequestCreateProfile,
} from "../../types/auth/types";
import { useAuthStore } from "../../store/useAuthStore";

export const useCreateProfile = () => {
  const navigate = useNavigate();

  return useMutation<
    { profile: ResponseCreateProfile; refresh: ResponseRefresh },
    Error,
    RequestCreateProfile
  >({
    onMutate: (variables) => {
      console.log("전송할 profileData:", variables);
    },
    mutationFn: async (profileData) => {
      // 프로필 생성 후
      console.log("프로필 생성 요청");
      const profileResponse = await createProfileApi(profileData);
      if (profileResponse.resultType !== "SUCCESS") {
        throw new Error(
          profileResponse.error?.reason || "프로필 생성에 실패했습니다."
        );
      }

      // 리프레시 토큰 요청
      console.log("토큰 갱신 요청");
      const refreshResponse = await refreshApi();
      if (refreshResponse.resultType !== "SUCCESS") {
        throw new Error(
          refreshResponse.error?.reason || "토큰 갱신에 실패했습니다."
        );
      }

      return {
        profile: profileResponse,
        refresh: refreshResponse,
      };
    },
    onSuccess: async ({ profile, refresh }) => {
      console.log("프로필 생성 및 토큰 갱신 완료:", { profile, refresh });
      await useAuthStore.getState().loadAvatar();
      navigate("/?showCompleteModal=true");
    },
    onError: (error) => {
      console.error("프로필 생성 오류:", error);

      let errorMessage = "프로필 생성 중 오류가 발생했습니다.";
      if (error.message.includes("토큰")) {
        errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
        navigate("/signIn/email");
      } else if (error.message.includes("400")) {
        errorMessage = "프로필 설정 실패"; //세부 오류 메세지 추가
      }

      alert(errorMessage);
    },
  });
};
