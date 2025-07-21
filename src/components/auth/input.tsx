import React from "react";
import EyeOffIcon from "../../assets/icons/ic_eyeoff_24.svg";
import EyeIcon from "../../assets/icons/ic_eye_24.svg";

interface InputProps {
  type: "email" | "password" | "text";
  placeholder: string;
  showPassword?: boolean;
  togglePassword?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  showPassword,
  togglePassword,
  value,
  onChange,
  width = "27.08vw",
}) => {
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <div
      className="h-12 md:h-14 lg:h-16 bg-white rounded-[10px] border-2 border-stone-300 mb-2 relative"
      style={{ width }}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-full rounded-[10px] px-4 ${
          isPasswordType ? "pr-12" : ""
        } text-sm md:text-base lg:text-lg font-['Pretendard'] focus:outline-none`}
      />

      {isPasswordType && togglePassword && (
        <img
          src={showPassword ? EyeIcon : EyeOffIcon}
          alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
          onClick={togglePassword}
        />
      )}
    </div>
  );
};

export default Input;
