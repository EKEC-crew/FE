interface SubmitButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#3A3ADB] hover:bg-blue-700 text-white py-3.5 rounded-lg ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{
        backgroundImage: "url('/src/assets/signIn/btn_login_520x68.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% auto",
      }}
    >
      <span className="text-lg font-semibold">
        {disabled ? '등록 중...' : '등록 완료하기'}
      </span>
    </button>
  );
};

export default SubmitButton;
