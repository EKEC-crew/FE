import { useEffect, useRef, useState } from "react";
import icMore from "../../../assets/schedule/ic_More.svg";

interface CommentDropdownProps {
  isAuthor: boolean; // 댓글 작성자인지 여부
  onEdit?: () => void; // 수정 함수
  onDelete?: () => void; // 삭제 함수
  onReport?: () => void; // 신고 함수
}

const CommentDropdown = ({
  isAuthor,
  onEdit,
  onDelete,
  onReport,
}: CommentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
      >
        <img src={icMore} alt="더보기" className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-10">
          {isAuthor ? (
            // 작성자인 경우: 수정, 삭제
            <>
              <button
                onClick={() => handleAction(onEdit || (() => {}))}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => handleAction(onDelete || (() => {}))}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
              >
                삭제
              </button>
            </>
          ) : (
            // 작성자가 아닌 경우: 신고
            <button
              onClick={() => handleAction(onReport || (() => {}))}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors"
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
