import checkBoxIcon from "../../../../assets/icons/ic_check_de.svg";
import pressedCheckBoxIcon from "../../../../assets/icons/ic_check_pressed.svg";

interface PermissionSelectorProps {
  allowComments?: boolean;
  allowPrivateComments?: boolean;
  allowExternalShare?: boolean;
  onAllowCommentsChange?: (value: boolean) => void;
  onAllowPrivateCommentsChange?: (value: boolean) => void;
  onAllowExternalShareChange?: (value: boolean) => void;
}

const PermissionSelector = ({
  allowComments = true,
  allowPrivateComments = true,
  allowExternalShare = false,
  onAllowCommentsChange,
  onAllowPrivateCommentsChange,
  onAllowExternalShareChange,
}: PermissionSelectorProps) => {
  const handleCommentsToggle = () => {
    onAllowCommentsChange?.(!allowComments);
  };

  const handlePrivateCommentsToggle = () => {
    onAllowPrivateCommentsChange?.(!allowPrivateComments);
  };

  const handleExternalShareToggle = () => {
    onAllowExternalShareChange?.(!allowExternalShare);
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">허용 범위</label>
      <div className="flex gap-6 p-2">
        {/* 댓글 허용 */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleCommentsToggle}
        >
          <div className="w-5 h-5 relative flex-shrink-0">
            <img
              src={allowComments ? pressedCheckBoxIcon : checkBoxIcon}
              alt={allowComments ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <span>댓글 허용</span>
        </div>

        {/* 비공개 댓글 허용 */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handlePrivateCommentsToggle}
        >
          <div className="w-5 h-5 relative flex-shrink-0">
            <img
              src={allowPrivateComments ? pressedCheckBoxIcon : checkBoxIcon}
              alt={allowPrivateComments ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <span>비공개 댓글 허용</span>
        </div>

        {/* 외부 공유 허용 */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={handleExternalShareToggle}
        >
          <div className="w-5 h-5 relative flex-shrink-0">
            <img
              src={allowExternalShare ? pressedCheckBoxIcon : checkBoxIcon}
              alt={allowExternalShare ? "체크박스 선택됨" : "체크박스"}
              className="w-full h-full"
            />
          </div>
          <span>외부 공유 허용</span>
        </div>
      </div>
    </div>
  );
};

export default PermissionSelector;
