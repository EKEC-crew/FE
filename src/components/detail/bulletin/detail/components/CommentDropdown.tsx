// CommentDropdown.tsx
import  { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import icMore from "../../../../../assets/schedule/ic_More.svg";

interface CommentDropdownProps {
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

const GAP = 8;               // 버튼과 메뉴 사이 간격
const MENU_W = 140;          // 예상 메뉴 가로
const MENU_H = 120;          // 예상 메뉴 세로(아이템 2~3개 기준)

const CommentDropdown = ({
  isAuthor,
  onEdit,
  onDelete,
  onReport,
}: CommentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 버튼 기준으로 메뉴 위치 계산 (화면 밖으로 넘치지 않도록)
  const computePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const placeTop = vh - rect.bottom < MENU_H && rect.top > MENU_H + GAP;
    const top = placeTop ? rect.top - MENU_H - GAP : rect.bottom + GAP;

    // 오른쪽 정렬하되, 화면 밖으로 넘어가면 보정
    let left = rect.right - MENU_W;
    if (left < GAP) left = GAP;
    if (left + MENU_W > vw - GAP) left = vw - GAP - MENU_W;

    setCoords({ top, left });
  };

  const open = () => {
    computePosition();
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  // 바깥 클릭 닫기 (포털 메뉴까지 포함)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        buttonRef.current?.contains(t) ||
        menuRef.current?.contains(t)
      ) {
        return;
      }
      close();
    };
    if (isOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen]);

  // 스크롤/리사이즈 시 위치 재계산
  useEffect(() => {
    const onReposition = () => {
      if (isOpen) computePosition();
    };
    window.addEventListener("resize", onReposition);
    // capture 모드로 모든 스크롤에 반응
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [isOpen]);

  const handleAction = (fn?: () => void) => {
    fn && fn();
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? close() : open())}
        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <img src={icMore} alt="더보기" className="w-5 h-5" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: MENU_W,
              zIndex: 9999,
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg py-1"
            role="menu"
          >
            {isAuthor ? (
              <>
                <button
                  onClick={() => handleAction(onEdit)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                  role="menuitem"
                >
                  수정
                </button>
                <button
                  onClick={() => handleAction(onDelete)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  role="menuitem"
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                onClick={() => handleAction(onReport)}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
                role="menuitem"
              >
                신고
              </button>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default CommentDropdown;
