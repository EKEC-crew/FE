import { useLocation } from "react-router-dom";

const OAuthFail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  let message = "소셜 로그인 실패";

  if (code === "1") {
    message = "이미 존재하는 이메일입니다.";
  }

  return <div>{message}</div>;
};

export default OAuthFail;
