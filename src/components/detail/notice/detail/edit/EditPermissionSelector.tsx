type EditPermissionSelectorProps = {
  allowComment: boolean;
  setAllowComment: (v: boolean) => void;
  allowPrivateComment: boolean;
  setAllowPrivateComment: (v: boolean) => void;
  allowShare: boolean;
  setAllowShare: (v: boolean) => void;
};

const EditPermissionSelector: React.FC<EditPermissionSelectorProps> = ({
  allowComment,
  setAllowComment,
  allowPrivateComment,
  setAllowPrivateComment,
  allowShare,
  setAllowShare,
}) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">허용 범위</label>
      <div className="flex gap-6 p-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={allowComment}
              onChange={(e) => setAllowComment(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded-md border-3 transition-all duration-200 flex items-center justify-center ${
                allowComment ? "bg-[#4F46E5] border-[#4F46E5]" : "bg-white border-[#4F46E5]"
              }`}
            >
              {allowComment && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span>댓글 허용</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={allowPrivateComment}
              onChange={(e) => setAllowPrivateComment(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded-md border-3 transition-all duration-200 flex items-center justify-center ${
                allowPrivateComment ? "bg-[#4F46E5] border-[#4F46E5]" : "bg-white border-[#4F46E5]"
              }`}
            >
              {allowPrivateComment && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span>비공개 댓글 허용</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={allowShare}
              onChange={(e) => setAllowShare(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-6 h-6 rounded-md border-3 transition-all duration-200 flex items-center justify-center ${
                allowShare ? "bg-[#4F46E5] border-[#4F46E5]" : "bg-white border-[#4F46E5]"
              }`}
            >
              {allowShare && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span>외부 공유 허용</span>
        </label>
      </div>
    </div>
  );
};

export default EditPermissionSelector;