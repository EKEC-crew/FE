import React from "react";
import { useErrorModal } from "../../../hooks/auth/useErrorModal";
import Modal from "../../common/Modal";

const PasswordErrorModal: React.FC = () => {
  const { closeModal } = useErrorModal();

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <Modal onClose={handleConfirm} maxWidth="max-w-[560px]" padding="p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-black text-2xl font-bold">
          비밀번호를 다시 입력해주세요
        </div>

        <div className="w-full pt-4">
          <button
            onClick={handleConfirm}
            className="w-full py-3 px-4 bg-[#3A3ADB] text-white rounded-xl font-medium hover:bg-[#2d2db5] transition-colors text-lg"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordErrorModal;
