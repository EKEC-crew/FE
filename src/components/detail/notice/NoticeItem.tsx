import React, { useCallback } from 'react';
import type { NoticeItemProps } from "../../../types/notice/types";

const NoticeItem: React.FC<NoticeItemProps> = ({ notice, onNoticeClick, index }) => {
  const handleClick = useCallback(() => {
    onNoticeClick?.(notice);
  }, [notice, onNoticeClick]);

  console.log('Notice item index:', index);

  return (
    <div 
      className="flex items-center justify-between py-2 px-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* 왼쪽 영역: 필독 라벨 */}
      <div className="w-16 flex-shrink-0">
        {notice.hasLabel && notice.labelText && (
          <span className="bg-[#3a3adb] text-white px-2 py-1 rounded-2xl text-xs font-medium">
            {notice.labelText}
          </span>
        )}
      </div>
      
      {/* 중앙 영역: 제목 */}
      <div className="flex-1 min-w-0 px-2">
        <span className="text-gray-800 font-semibold truncate text-sm md:text-base block">
          {notice.title}
        </span>
      </div>
      
      {/* 오른쪽 영역: 날짜와 시간 */}
      <div className="flex items-center text-gray-400 text-xs md:text-sm space-x-3 md:space-x-6 flex-shrink-0">
        <span>{notice.date}</span>
        <span>{notice.time}</span>
      </div>
    </div>
  );
};

export default NoticeItem;