import React, { useCallback } from "react";

interface Bulletin {
  id: number;
  title: string;
  date: string;
  author: string;
  isPopular: boolean;
  hasAttachment: boolean;
}

interface BulletinItemProps {
  bulletin: Bulletin;
  onBulletinClick?: (bulletin: Bulletin) => void;
  index: number;
}

const BulletinItem: React.FC<BulletinItemProps> = ({
  bulletin,
  onBulletinClick,
  index,
}) => {
  const handleClick = useCallback(() => {
    onBulletinClick?.(bulletin);
  }, [bulletin, onBulletinClick]);

  console.log("Bulletin item index:", index);

  return (
    <div
      className="flex items-center justify-between py-2 px-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors duration-200 rounded-lg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* 왼쪽 영역: 인기 라벨 */}
      <div className="w-16 flex-shrink-0">
        {bulletin.isPopular && (
          <span className="bg-[#3a3adb] text-white px-2 py-1 rounded-2xl text-xs font-medium">
            인기
          </span>
        )}
      </div>

      {/* 중앙 영역: 제목 */}
      <div className="flex-1 min-w-0 px-2">
        <span className="text-gray-800 font-semibold truncate text-sm md:text-base block">
          {bulletin.title}

          {bulletin.hasAttachment && (
            <span className="text-blue-500 text-xs ml-1">📎</span>
          )}
        </span>
      </div>

      {/* 오른쪽 영역: 날짜와 작성자 */}
      <div className="flex items-center text-gray-400 text-xs md:text-sm space-x-2 flex-shrink-0">
        <span>{bulletin.date}</span>
        <span>{bulletin.author}</span>
      </div>
    </div>
  );
};

export default BulletinItem;
