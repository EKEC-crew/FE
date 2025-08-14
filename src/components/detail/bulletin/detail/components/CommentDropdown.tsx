import { useEffect, useRef, useState } from "react";
import icMore from "../../../../../assets/schedule/ic_More.svg";

interface CommentDropdownProps {
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

const CommentDropdown = ({
  isAuthor,
  onEdit,
  onDelete,
  onReport,
}: CommentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      // 드롭다운을 열 때 위치 계산
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 120; // 예상 드롭다운 높이

      // 버튼 아래쪽 공간이 충분한지 확인
      const spaceBelow = viewportHeight - buttonRect.bottom;

      if (spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
      >
        <img src={icMore} alt="더보기" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-50 ${
            dropdownPosition === "top" ? "bottom-8" : "top-8"
          }`}
        >
          {isAuthor ? (
            // 작성자인 경우: 수정, 삭제
            <>
              <button
                onClick={() => handleAction(onEdit || (() => {}))}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                수정
              </button>
              <button
                onClick={() => handleAction(onDelete || (() => {}))}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                삭제
              </button>
            </>
          ) : (
            // 작성자가 아닌 경우: 신고
            <button
              onClick={() => handleAction(onReport || (() => {}))}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              신고
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentDropdown;
