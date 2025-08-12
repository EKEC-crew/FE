export default function ApplySubmitBar({
  disabled,
  onSubmit,
  onDebug,
  label = "제출하기",
}: {
  disabled: boolean;
  onSubmit: () => void | Promise<void>;
  onDebug?: () => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        className={`mt-2 rounded px-4 py-2 text-white ${
          disabled ? "cursor-not-allowed bg-gray-300" : "bg-[#3A3ADB]"
        }`}
        disabled={disabled}
        onClick={onSubmit}
      >
        {label}
      </button>

      {onDebug && (
        <button
          className="mt-2 rounded border border-gray-300 px-4 py-2"
          onClick={onDebug}
        >
          디버그 로그
        </button>
      )}
    </div>
  );
}
