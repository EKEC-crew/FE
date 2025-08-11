import React from "react";
import { useNavigate } from "react-router-dom";
import { useErrorModal } from "../../../hooks/auth/useErrorModal";
import Modal from "../../common/Modal";

const SignUpPromptModal: React.FC = () => {
  const navigate = useNavigate();
  const { closeModal } = useErrorModal();

  const handleSignUp = () => {
    closeModal();
    navigate("/signUp");
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal onClose={handleCancel} maxWidth="max-w-[560px]" padding="p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-black text-2xl font-bold">
          혹시 EKEC 회원이 아니신가요?
        </div>

        <div className="text-black text-xl font-medium">
          가입시 더 많은 혜택을 누릴 수 있어요!
        </div>

        <div className="flex w-full gap-3 pt-4">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors text-lg"
          >
            취소하기
          </button>
          <button
            onClick={handleSignUp}
            className="flex-1 py-3 px-4 bg-[#3A3ADB] text-white rounded-xl font-medium hover:bg-[#2d2db5] transition-colors text-lg"
          >
            회원가입
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpPromptModal;
