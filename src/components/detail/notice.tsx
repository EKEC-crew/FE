import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNoticeList } from "./notice/constants";

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  // 공지사항 목록 가져오기
  const { data: noticesResponse } = useQuery<any>({
    queryKey: ["notices", crewId],
    queryFn: () => fetchNoticeList(crewId!, 1, 1), // 첫 번째 공지사항만 가져오기
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
  });

  // 첫 번째 공지사항의 제목 추출
  const firstNoticeTitle = noticesResponse?.data?.data?.[0]?.title || "공지사항이 없습니다";

  const handleClick = () => {
    navigate(`/crew/${crewId}/notice`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <span className="bg-blue-700 text-white text-sm px-3 py-1 rounded-full mr-2">
        공지사항
      </span>

      <div className="flex-1 text-sm text-gray-900 truncate text-left">
        <strong className="text-black ml-4 mr-1">[공지사항]</strong>
        {firstNoticeTitle}
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
