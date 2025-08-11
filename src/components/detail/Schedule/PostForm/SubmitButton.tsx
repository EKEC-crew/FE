interface SubmitButtonProps {
  onSubmit: () => void;
  isLoading?: boolean;
}

const SubmitButton = ({ onSubmit, isLoading = false }: SubmitButtonProps) => {
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
      <span className="text-lg font-semibold">
        {isLoading ? "등록 중..." : "등록 완료하기"}
      </span>
    </button>
  );
};

export default SubmitButton;
