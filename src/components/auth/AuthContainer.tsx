import EmailSignInForm from "./signIn/emailSignInForm";
import SignInForm from "./signIn/signInForm";

// 나중에 추가될 컴포넌트들을 위한 임시 컴포넌트
const SignUpForm = () => <div>회원가입 폼 (구현 예정)</div>;

interface AuthContainerProps {
  variant: "signIn" | "emailsignIn" | "signUp";
}

const AuthContainer: React.FC<AuthContainerProps> = ({ variant }) => {
  const children = () => {
    switch (variant) {
      case "signIn":
        return <SignInForm />;
      case "emailsignIn":
        return <EmailSignInForm />;
      case "signUp":
        return <SignUpForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative z-10 flex items-center justify-center min-h-screen px-4"
      style={{ paddingTop: "9vh", paddingBottom: "9vh" }}
    >
      <div className="w-[90vw] h-[75vh] sm:w-[75vw] sm:h-[78vh] md:w-[50vw] md:h-[80vh] lg:w-[40vw] lg:h-[81vh] xl:w-[36.5vw] xl:h-[82vh]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 h-full flex flex-col justify-center p-15 overflow-hidden">
          {children()}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
