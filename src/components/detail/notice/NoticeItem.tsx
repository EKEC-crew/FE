import React, { useCallback } from "react";
import type { NoticeItemProps } from "../../../types/notice/types";

const NoticeItem: React.FC<NoticeItemProps> = ({
  notice,
  onNoticeClick,
  index,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("NoticeItem 클릭됨:", notice);
      console.log("onNoticeClick 함수 존재:", !!onNoticeClick);

      if (onNoticeClick) {
        onNoticeClick(notice);
      } else {
        console.error("onNoticeClick 함수가 전달되지 않았습니다");
      }
    },
    [notice, onNoticeClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(e as any);
      }
    },
    [handleClick]
  );

  console.log("Notice item render - index:", index, "notice:", notice);

  return (
    <div
      className="flex items-center justify-between py-2 px-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ userSelect: "none" }}
    >
      <div className="w-16 flex-shrink-0">
        {notice.type === 1 && (
          <span className="px-2 py-1 rounded-2xl text-xs font-medium bg-[#3a3adb] text-white">
            필독
          </span>
        )}
        {notice.type === 0 && (
          <span className="px-2 py-1 rounded-2xl text-xs font-medium bg-[#3a3adb] text-white">
            인기
          </span>
        )}
      </div>

      {/* 제목 */}
      <div className="flex-1 min-w-0 px-2">
        <span className="text-gray-800 font-semibold truncate text-sm md:text-base block">
          {notice.title}
        </span>
      </div>

      {/* 날짜와 시간 */}
      <div className="flex items-center text-gray-400 text-xs md:text-sm space-x-3 md:space-x-6 flex-shrink-0">
        <span>{notice.date}</span>
        <span>{notice.time}</span>
      </div>
    </div>
  );
};

export default NoticeItem;