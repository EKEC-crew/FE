import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EkecLogo from "../../../assets/icons/ic_logo_graphic_45.svg";
import emailSignInBtn from "../../../assets/signIn/btn_login_520x68.svg";
import checkBoxIcon from "../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../assets/icons/ic_check_pressed.svg";
import Input from "../input";
import {
  authSchema,
  type AuthFormValues,
} from "../../../schemas/auth/authSchema";

const EmailSignInForm: React.FC = () => {
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const handleCheckboxToggle = () => {
    setIsAutoLogin(!isAutoLogin);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
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

      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        register={register("email")}
      />
      {errors?.email && (
        <div className="text-red-500 text-sm mt-1 mb-3 px-1 w-full max-w-[27.08vw]">
          {errors.email.message}
        </div>
      )}

      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        register={register("password")}
        showPassword={showPassword}
        togglePassword={handlePasswordToggle}
      />

      <div className="mb-6" style={{ width: "27.08vw" }}>
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
        className="relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6"
        style={{ width: "27.08vw" }}
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

      <div className="flex justify-center items-center space-x-4 md:space-x-6 text-neutral-400 text-base md:text-sm font-['Pretendard']">
        <Link to="/findId" className="hover:underline">
          아이디 찾기
        </Link>
        <span className="text-neutral-300">|</span>
        <Link to="/findPassword" className="hover:underline">
          비밀번호 찾기
        </Link>
        <span className="text-neutral-300">|</span>
        <Link to="/signUp" className="hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default EmailSignInForm;
