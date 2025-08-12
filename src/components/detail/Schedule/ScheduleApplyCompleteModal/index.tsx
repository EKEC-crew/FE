import Modal from "../../../common/Modal";
import icCompleteApply from "../../../../assets/icons/ic_complete_apply.svg";
import { getModalTitle } from "../../../../utils/scheduleUtils";

interface ScheduleApplyCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasFee: boolean;
}

const ScheduleApplyCompleteModal = ({
  isOpen,
  onClose,
  hasFee,
}: ScheduleApplyCompleteModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} maxWidth="max-w-[400px]" padding="p-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <img src={icCompleteApply} alt="신청 완료" className="w-16 h-16" />

        <div className="text-black text-2xl font-bold">
          {getModalTitle(hasFee)}
        </div>

        <div className="text-gray-600 text-base">
          마이페이지에서 다가오는 일정을 확인해주세요.
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-[#3A3ADB] text-white rounded-xl font-medium hover:bg-[#2d2db5] transition-colors text-lg"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default ScheduleApplyCompleteModal;
