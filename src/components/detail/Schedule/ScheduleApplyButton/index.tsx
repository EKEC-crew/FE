import AuthBtn from "../../../auth/authBtn";
import { getAuthBtnText } from "../../../../utils/scheduleUtils";

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
      <AuthBtn
        onClick={onConfirm}
        disabled={isPending}
        variant={isPending ? "disabled" : "default"}
        className="w-full"
      >
        {getAuthBtnText(isPending, hasFee)}
      </AuthBtn>
    </div>
  );
};

export default ScheduleApplyButton;
