import AuthBackground from "../components/auth/authBackground";
import AuthHeader from "../components/auth/authHeader";
import CreateProfileBackground from "../components/auth/createProfile/createProfileBackground";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  // 프로필 생성 페이지인지 확인
  const isCreateProfilePage = location.pathname.includes("/createProfile");

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        {isCreateProfilePage ? <CreateProfileBackground /> : <AuthBackground />}
      </div>
      <div className="relative z-10">
        <AuthHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
