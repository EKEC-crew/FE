import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthFail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const navigate = useNavigate();

  let message = "소셜 로그인 실패";

  useEffect(() => {
    if (code === "1") {
      alert("이미 존재하는 이메일입니다. 이크에크 아이디로 로그인 해주세요");
      navigate("/signIn");
    }
  }, [code, navigate]);

  if (code === "1") {
    message = "이미 존재하는 이메일입니다. 이크에크 아이디로 로그인 해주세요";
  }

  return <div>{message}</div>;
};

export default OAuthFail;
