import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/auth";
import type { RequestSign, ResponseSign } from "../../types/auth/types";

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation<ResponseSign, Error, RequestSign>({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log("로그인 성공:", response);

      if (response.resultType === "SUCCESS") {
        // TODO: 나중에 프로필 생성 완료 여부에 따라 분기 처리
        navigate("/");
      } else {
        // 서버에서 FAIL 응답을 보낸 경우
        console.error("로그인 실패:", response.error);
        throw new Error(response.error?.reason || "로그인에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("로그인 오류:", error);

      // 에러 메시지 처리
      let errorMessage = "로그인 중 오류가 발생했습니다.";

      if (error.message.includes("401")) {
        errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
      } else if (error.message.includes("404")) {
        errorMessage = "존재하지 않는 계정입니다.";
      } else if (error.message.includes("400")) {
        errorMessage = "입력 정보를 확인해주세요.";
      }

      alert(errorMessage);
    },
  });
};
