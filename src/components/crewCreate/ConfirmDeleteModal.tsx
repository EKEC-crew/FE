interface ConfirmDeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-xl w-125 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold text-[26px] text-[#2B2C31]">
          질문을 정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onCancel}
            className="bg-[#D9DADD] text-[#5E6068] text-[26px] font-semibold w-full py-2 rounded-lg cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#3A3ADB] text-white text-[26px] font-semibold w-full py-2 rounded-lg cursor-pointer"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
