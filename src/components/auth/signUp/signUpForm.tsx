import { Link } from "react-router-dom";
import { useState } from "react";
import EkecLogo from "../../../assets/icons/ic_logo_graphic_45.svg";
import emailSignInBtn from "../../../assets/signIn/btn_login_520x68.svg";
import Input from "../input";
import { z } from "zod";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordConfirmToggle = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const validateEmail = (email: string) => {
    const emailSchema = z
      .string()
      .email({ message: "올바른 이메일 형식이 아닙니다" });
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      setEmailError(result.error.errors[0].message);
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim() !== "") {
      validateEmail(value);
    } else {
      setEmailError("");
    }
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

      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={handleEmailChange}
      />
      {emailError && (
        <div className="text-red-500 text-sm font-['Pretendard'] mt-1 mb-3 px-1 w-full max-w-[27.08vw]">
          {emailError}
        </div>
      )}

      <Input
        type="password"
        placeholder="비밀번호"
        showPassword={showPassword}
        togglePassword={handlePasswordToggle}
      />

      <Input
        type="password"
        placeholder="비밀번호 확인"
        showPassword={showPasswordConfirm}
        togglePassword={handlePasswordConfirmToggle}
      />

      <Link
        to="/signUp/completed"
        className="w-full max-w-[32.5rem] relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
      >
        <img
          src={emailSignInBtn}
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
