import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EkecLogo from "../../../assets/icons/ic_logo_graphic_45.svg";
import signUpBtn from "../../../assets/signIn/btn_login_520x68.svg";
import disabledBtn from "../../../assets/buttons/disabled.svg";
import warnIcon from "../../../assets/icons/auth/warn.svg";
import okIcon from "../../../assets/icons/auth/ok.svg";
import Input from "../input";
import {
  signUpSchema,
  type SignUpFormValues,
} from "../../../schemas/auth/authSchema";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const watchedPassword = watch("password");

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordConfirmToggle = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      console.log("회원가입 데이터:", data);
      navigate("/createProfile");
      //회원가입 로직 추가
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-[12.86%]">
      <img src={EkecLogo} alt="EKEC 로고" className="mb-4 w-11 h-11" />

      <div className="text-center text-neutral-800 text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
        EKEC ID 회원가입
      </div>
      <div className="text-center text-neutral-800 text-base md:text-lg font-normal mb-8">
        이크에크는 크루 참여 및 관리가 편리해요
      </div>

      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input type="email" placeholder="이메일" register={register("email")} />
        {errors?.email && (
          <div
            className="flex items-center justify-start text-red-500 text-sm mt-1 mb-3"
            style={{ width: "27.08vw" }}
          >
            <img
              src={warnIcon}
              alt="경고"
              className="w-4 h-4 mr-2 flex-shrink-0"
            />
            {errors.email.message}
          </div>
        )}

        <Input
          type="password"
          placeholder="비밀번호"
          register={register("password")}
          showPassword={showPassword}
          togglePassword={handlePasswordToggle}
        />

        <Input
          type="password"
          placeholder="비밀번호 확인"
          register={register("passwordCheck")}
          showPassword={showPasswordConfirm}
          togglePassword={handlePasswordConfirmToggle}
        />

        {errors?.password ? (
          <div
            className="text-red-500 text-sm mt-1 space-y-1"
            style={{ width: "27.08vw" }}
          >
            {errors.password.message?.split("\n").map((msg, index) => (
              <div key={index} className="flex items-center justify-start">
                <img src={warnIcon} alt="경고" className="w-4 h-4 mr-2" />
                {msg}
              </div>
            ))}
          </div>
        ) : !errors?.password && watchedPassword ? (
          <div
            className="flex items-center justify-start text-green-500 text-sm mt-1"
            style={{ width: "27.08vw" }}
          >
            <img src={okIcon} alt="성공" className="w-4 h-4 mr-2" />
            사용 가능한 비밀번호입니다
          </div>
        ) : null}

        {errors?.passwordCheck && (
          <div
            className="flex items-center justify-start text-red-500 text-sm mt-1"
            style={{ width: "27.08vw" }}
          >
            <img
              src={warnIcon}
              alt="경고"
              className="w-4 h-4 mr-2 flex-shrink-0"
            />
            {errors.passwordCheck.message}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="relative flex items-center justify-center h-12 md:h-14 lg:h-16 transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-6 mt-10 disabled:pointer-events-none"
          style={{ width: "27.08vw" }}
        >
          <img
            src={isValid ? signUpBtn : disabledBtn}
            alt="회원가입 버튼"
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base lg:text-lg font-medium">
            회원가입하기
          </div>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
