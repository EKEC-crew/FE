import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { refreshApi, createProfileApi } from "../../apis/auth";
import type {
  ResponseRefresh,
  ResponseCreateProfile,
  RequestCreateProfile,
} from "../../types/auth/types";

export const useCreateProfile = () => {
  const navigate = useNavigate();

  return useMutation<
    { refresh: ResponseRefresh; profile: ResponseCreateProfile },
    Error,
    RequestCreateProfile
  >({
    mutationFn: async (profileData: RequestCreateProfile) => {
      // 1. 먼저 refresh 토큰 요청
      console.log("토큰 갱신 요청...");
      const refreshResponse = await refreshApi();

      if (refreshResponse.resultType !== "SUCCESS") {
        throw new Error(
          refreshResponse.error?.reason || "토큰 갱신에 실패했습니다."
        );
      }

      // 2. 프로필 생성 요청
      console.log("프로필 생성 요청...");
      const profileResponse = await createProfileApi(profileData);

      if (profileResponse.resultType !== "SUCCESS") {
        throw new Error(
          profileResponse.error?.reason || "프로필 생성에 실패했습니다."
        );
      }

      return {
        refresh: refreshResponse,
        profile: profileResponse,
      };
    },
    onSuccess: (response) => {
      console.log("프로필 생성 완료:", response);

      // 프로필 생성 완료 후 메인 페이지로 이동 (완료 모달과 함께)
      navigate("/?showCompleteModal=true");
    },
    onError: (error) => {
      console.error("프로필 생성 오류:", error);

      // 에러 메시지 처리
      let errorMessage = "프로필 생성 중 오류가 발생했습니다.";

      if (error.message.includes("토큰")) {
        errorMessage = "인증이 만료되었습니다. 다시 로그인해주세요.";
        // 토큰 만료 시 로그인 페이지로 리다이렉트
        navigate("/emailSignIn");
      } else if (error.message.includes("400")) {
        errorMessage = "입력 정보를 확인해주세요.";
      }

      alert(errorMessage);
    },
  });
};
