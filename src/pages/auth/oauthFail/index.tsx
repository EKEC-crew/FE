import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthFail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");

  useEffect(() => {
    // code=1일 때 signIn 페이지로 리다이렉트하면서 에러 상태 전달
    if (code === "1") {
      navigate("/signIn?oauthError=true", { replace: true });
    }
  }, [code, navigate]);

  // 리다이렉트 중이므로 빈 화면 또는 로딩 표시
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">페이지를 이동 중입니다...</div>
    </div>
  );
};

export default OAuthFail;
