// CommentDropdown.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import icMore from "../../../assets/schedule/ic_More.svg";

interface CommentDropdownProps {
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

const GAP = 8;

const CommentDropdown = ({
  isAuthor,
  onEdit,
  onDelete,
  onReport,
}: CommentDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);

  const positionMenu = () => {
    if (!buttonRef.current || !menuRef.current) return;

    const btn = buttonRef.current.getBoundingClientRect();
    const menu = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const placeTop = vh - btn.bottom < menu.height + GAP && btn.top > menu.height + GAP;
    const top = placeTop ? btn.top - menu.height - GAP : btn.bottom + GAP;

    let left = btn.right - menu.width; // 오른쪽정렬
    if (left < GAP) left = GAP;
    if (left + menu.width > vw - GAP) left = vw - GAP - menu.width;

    setCoords({ top, left });
  };

  const open = () => {
    setIsOpen(true);
  };

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isOpen]);

  // 열릴 때/스크롤/리사이즈 시 위치 재계산
  useEffect(() => {
    if (!isOpen) return;
    // 메뉴 DOM이 그려진 다음 프레임에서 측정
    const id = requestAnimationFrame(positionMenu);
    const onReposition = () => positionMenu();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [isOpen]);

  const handleAction = (fn?: () => void) => {
    fn?.();
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
              zIndex: 9999,
              minWidth: 120,
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
