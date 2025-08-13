import { getAuthBtnText } from "../../../../utils/scheduleUtils";
import BtnApply from "../../../common/btn_apply";

interface ScheduleApplyButtonProps {
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  hasFee: boolean;
}

const ScheduleApplyButton = ({
  onConfirm,
  isPending,
  hasFee,
}: ScheduleApplyButtonProps) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onConfirm}
        disabled={isPending}
        className="relative flex items-center justify-center h-16 w-full transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 disabled:pointer-events-none cursor-pointer"
      >
        <BtnApply disabled={isPending} />

        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold pointer-events-none">
          {getAuthBtnText(isPending, hasFee)}
        </div>
      </button>
    </div>
  );
};

export default ScheduleApplyButton;
