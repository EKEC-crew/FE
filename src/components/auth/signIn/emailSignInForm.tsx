import { Link } from "react-router-dom";
import EkecLogo from "../../../assets/icons/ic_logo_graphic_45.svg";
import emailSignInBtn from "../../../assets/signIn/btn_login_520x68.svg";
import checkBoxIcon from "../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../assets/icons/ic_check_pressed.svg";
import { useState } from "react";
import Input from "../input";
import { getValidationErrors } from "../../../schemas/auth/signUpSchema";

const EmailSignInForm: React.FC = () => {
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 검증 (6글자 이상 입력했을 때만 검증)
  const emailErrors =
    email.length >= 6 ? getValidationErrors("email", email) : [];

  const handleCheckboxToggle = () => {
    setIsAutoLogin(!isAutoLogin);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[12.86%]">
      <img src={EkecLogo} alt="EKEC 로고" className="mb-4 w-11 h-11" />

      <div className="text-center text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-bold font-['Pretendard'] mb-2">
        EKEC ID 로그인
      </div>
      <div className="text-center text-neutral-800 text-base md:text-lg font-normal font-['Pretendard'] mb-8">
        이크에크는 크루 참여 및 관리가 편리해요
      </div>

      <div className="w-full max-w-[32.5rem]">
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        />
        {emailErrors.length > 0 && (
          <div className="text-red-500 text-sm font-['Pretendard'] mt-1 mb-3 px-1">
            {emailErrors[0]}
          </div>
        )}
      </div>

      <div className="w-full max-w-[32.5rem]">
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          togglePassword={handlePasswordToggle}
        />
      </div>

      <div className="flex items-center mb-6 w-full max-w-[32.5rem]">
        <div
          className="flex items-center cursor-pointer select-none"
          onClick={handleCheckboxToggle}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 relative mr-3 flex-shrink-0">
            <img
              src={isAutoLogin ? pressedCheckBoxIcon : checkBoxIcon}
              alt={isAutoLogin ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <div className="text-neutral-400 text-sm md:text-base lg:text-xl font-medium font-['Pretendard']">
            자동 로그인
          </div>
        </div>
      </div>

      <Link
        to="/signIn/completed"
        className="w-full max-w-[32.5rem] relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
      >
        <img
          src={emailSignInBtn}
          alt="이메일 로그인 버튼"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base lg:text-lg font-medium font-['Pretendard']">
          로그인하기
        </div>
      </Link>

      <div className="flex justify-center space-x-4 md:space-x-8 text-neutral-400 text-base md:text-sm font-['Pretendard']">
        <Link to="/findId" className="hover:underline">
          아이디 찾기
        </Link>
        <span>|</span>
        <Link to="/findPassword" className="hover:underline">
          비밀번호 찾기
        </Link>
        <span>|</span>
        <Link to="/signUp" className="hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default EmailSignInForm;
