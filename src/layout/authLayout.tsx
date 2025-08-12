import AuthBackground from "../components/auth/authBackground";
import AuthHeader from "../components/auth/authHeader";
import CreateProfileBackground from "../components/auth/createProfile/createProfileBackground";
import { Outlet, useLocation } from "react-router-dom";
import SignUpPromptModal from "../components/auth/modals/SignUpPromptModal";
import PasswordErrorModal from "../components/auth/modals/PasswordErrorModal";
import { useErrorModal } from "../hooks/auth/useErrorModal";

const AuthLayout = () => {
  const location = useLocation();
  const { modalType } = useErrorModal();

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

      {/* 회원가입 유도 모달 */}
      {modalType === "signUpPrompt" && <SignUpPromptModal />}

      {/* 비밀번호 에러 모달 */}
      {modalType === "passwordError" && <PasswordErrorModal />}
    </div>
  );
};

export default AuthLayout;
