import React from "react";
import EyeOffIcon from "../../assets/icons/ic_eyeoff_24.svg";
import EyeIcon from "../../assets/icons/ic_eye_24.svg";

interface InputProps {
  type: "email" | "password" | "text" | "phoneNum";
  placeholder?: string;
  showPassword?: boolean;
  togglePassword?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  disabled?: boolean; //정보 수정이 불가능하게 재사용하기 위해 추가함 -동열-

  //pass 버튼을 위한 inputProps
  rightButtonLabel?: string;
  onRightButtonClick?: () => void;
  rightButtonDisabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  showPassword,
  togglePassword,
  value,
  onChange,
  width = "27.08vw",
  disabled,
  rightButtonLabel,
  onRightButtonClick,
  rightButtonDisabled,
}) => {
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <div
      className={`h-12 md:h-14 lg:h-16 rounded-[10px] border-2 mb-2 relative 
        ${
          disabled
            ? "bg-gray-100 border-gray-300 cursor-not-allowed"
            : "bg-white border-stone-300"
        }`}
      style={{ width }}
    >
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full h-full rounded-[10px] px-4 ${
          isPasswordType ? "pr-12" : ""
        } text-sm md:text-base lg:text-lg font-['Pretendard'] focus:outline-none 
        ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />

      {isPasswordType && togglePassword && (
        <img
          src={showPassword ? EyeIcon : EyeOffIcon}
          alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            if (!disabled) togglePassword();
          }}
        />
      )}

      {/* PASS 버튼 (오른쪽) */}
      {rightButtonLabel && (
        <button
          type="button"
          disabled={rightButtonDisabled}
          onClick={onRightButtonClick}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-xl font-bold text-white text-sm 
      flex items-center justify-center transition
      ${
        rightButtonDisabled
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : "bg-red-500 cursor-pointer"
      }`}
          style={{
            width: "5.44rem", // 87px
            height: "1.75rem", // 28px
          }}
        >
          {rightButtonLabel}
        </button>
      )}
    </div>
  );
};

export default Input;
