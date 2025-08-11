interface SubmitButtonProps {
  onSubmit: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

const SubmitButton = ({
  onSubmit,
  isLoading = false,
  isEditMode = false,
}: SubmitButtonProps) => {
  const buttonText = isLoading
    ? isEditMode
      ? "수정 중..."
      : "등록 중..."
    : isEditMode
      ? "수정 완료하기"
      : "등록 완료하기";

  return (
    <button
      onClick={onSubmit}
      disabled={isLoading}
      className={`w-full ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3A3ADB] hover:bg-blue-700"} text-white py-3.5 rounded-lg`}
      style={{
        backgroundImage: isLoading
          ? "none"
          : "url('/src/assets/signIn/btn_login_520x68.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% auto",
      }}
    >
      <span className="text-lg font-semibold">{buttonText}</span>
    </button>
  );
};

export default SubmitButton;
