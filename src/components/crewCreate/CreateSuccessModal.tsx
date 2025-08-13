import { useEffect } from "react";
import successIcon from "../../assets/icons/img_graphic_340.svg";

interface CreateSuccessModalProps {
  open: boolean;
  onConfirm: () => void; // 확인 & 백드롭 동일 동작
}

const CreateSuccessModal = ({ open, onConfirm }: CreateSuccessModalProps) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onConfirm}
    >
      {/* 패널 */}
      <div
        className="relative w-[90vw] max-w-[560px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={successIcon} alt="successIcon" className="mx-auto" />

        <h3 className="text-xl md:text-2xl font-bold mb-1">크루 생성 완료!</h3>
        <p className="text-base md:text-lg mb-6">
          지금부터 활동을 시작해보세요!
        </p>

        <button
          onClick={onConfirm}
          className="w-full h-12 rounded-lg text-white text-xl font-semibold bg-[#3A3ADB]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CreateSuccessModal;
