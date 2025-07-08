import React from "react";

const Notice: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full">
      <span className="bg-blue-700 text-white text-sm px-3 py-1 rounded-full mr-2">
        공지사항
      </span>

      <div className="flex-1 text-sm text-gray-900 truncate text-left">
        <strong className="text-black ml-4 mr-1">[크루원 필독 사항]</strong>
        신규 프로필 등록 및 네이밍 변경
      </div>

      <div className="flex items-center gap-2 ml-4 text-sm text-gray-500">
        <span>5/24</span>
        <span className="cursor-pointer">▲</span>
        <span className="cursor-pointer">▼</span>
      </div>
    </div>
  );
};

export default Notice;
