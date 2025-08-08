import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signInApi, signUpApi } from "../../apis/auth";
import type { ResponseSign, RequestSign } from "../../types/auth/types";

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation<ResponseSign, Error, RequestSign>({
    mutationFn: signUpApi,
    onSuccess: async (response, variables) => {
      console.log("회원가입 성공:", response);

      if (response.resultType === "SUCCESS") {
        try {
          // 회원가입 직후 자동 로그인 (isCompleted 필드 제거)
          const loginRes = await signInApi({
            email: variables.email,
            password: variables.password,
          });

          console.log("자동 로그인 성공:", loginRes);

          if (loginRes.resultType === "SUCCESS") {
            // isCompleted 값에 따라 분기
            if (loginRes.data?.isCompleted === false) {
              navigate("/createProfile");
            } else {
              navigate("/");
            }
          } else {
            console.error("자동 로그인 실패:", loginRes.error);
            navigate("/emailSignIn");
          }
        } catch (loginError) {
          console.error("자동 로그인 실패:", loginError);
          alert("회원가입은 완료되었습니다. 다시 로그인해주세요.");
          navigate("/emailSignIn");
        }
      } else {
        console.error("회원가입 실패:", response.error);
        throw new Error(response.error?.reason || "회원가입에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("회원가입 오류:", error);

      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      if (error.message.includes("409")) {
        errorMessage = "이미 가입된 이메일입니다.";
      } else if (error.message.includes("400")) {
        errorMessage = "입력 정보를 확인해주세요.";
      }

      alert(errorMessage);
    },
  });
};
