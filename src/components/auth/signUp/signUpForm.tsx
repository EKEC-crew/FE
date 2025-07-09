import { Link } from "react-router-dom";
import { useState } from "react";
import EkecLogo from "../../../assets/icons/ic_logo_graphic_45.svg";
import signUpBtn from "../../../assets/signIn/btn_login_520x68.svg";
import Input from "../input";
import { getValidationErrors } from "../../../schemas/auth/signUpSchema";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 실시간 검증 에러 (6글자 이상 입력했을 때만 검증)
  const emailErrors =
    email.length >= 6 ? getValidationErrors("email", email) : [];

  const passwordErrors = getValidationErrors("password", password);

  const passwordMatchErrors = getValidationErrors(
    "passwordMatch",
    password,
    passwordConfirm
  );

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordConfirmToggle = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[12.86%]">
      <img src={EkecLogo} alt="EKEC 로고" className="mb-4 w-11 h-11" />

      <div className="text-center text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-bold font-['Pretendard'] mb-2">
        EKEC ID 회원가입
      </div>
      <div className="text-center text-neutral-800 text-base md:text-lg font-normal font-['Pretendard'] mb-8">
        이크에크는 크루 참여 및 관리가 편리해요
      </div>

      <div className="w-full max-w-[32.5rem]">
        <Input
          type="email"
          placeholder="이메일"
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
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          showPassword={showPassword}
          togglePassword={handlePasswordToggle}
        />
      </div>

      <div className="w-full max-w-[32.5rem]">
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          showPassword={showPasswordConfirm}
          togglePassword={handlePasswordConfirmToggle}
        />
      </div>

      {/* 비밀번호 유효성 메시지 */}
      <div className="w-full max-w-[32.5rem] mb-3">
        {passwordErrors.length > 0 && (
          <div className="space-y-1">
            {passwordErrors.map((error, index) => (
              <div
                key={index}
                className="text-red-500 text-sm font-['Pretendard']"
              >
                {error}
              </div>
            ))}
          </div>
        )}
        {passwordErrors.length === 0 && password.length > 0 && (
          <div className="text-green-500 text-sm font-['Pretendard']">
            사용 가능한 비밀번호입니다
          </div>
        )}
        {passwordMatchErrors.length > 0 && (
          <div className="text-red-500 text-sm font-['Pretendard'] mt-1">
            {passwordMatchErrors[0]}
          </div>
        )}
      </div>

      <Link
        to="/signUp/completed"
        className="w-full max-w-[32.5rem] relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
      >
        <img
          src={signUpBtn}
          alt="회원가입 버튼"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base lg:text-lg font-medium font-['Pretendard']">
          회원가입하기
        </div>
      </Link>
    </div>
  );
};

export default SignUpForm;
