import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeItem from "../notice/NoticeItem";
import Pagination from "../notice/button/pagination";
import PostButton from "../notice/button/post";
import type { Notice } from "../notice/types";
import { generateNoticeData } from "../notice/constants";

const NoticeList: React.FC = () => {
  const navigate = useNavigate();

  const { crewId } = useParams();
  const [activeTab] = useState<string>("notice");
  const [notices] = useState<Notice[]>(generateNoticeData());

  const handleNoticeClick = useCallback(
    (notice: Notice) => {
      console.log("공지사항 클릭:", notice);
      navigate(`/crew/${crewId}/notice/${notice.id}`);
    },
    [navigate]
  );

  const handleWriteClick = useCallback(() => {
    console.log("글쓰기 버튼 클릭");
    navigate(`/crew/${crewId}/notice/post`);
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "notice":
        return (
          <>
            <div className="space-y-2">
              {notices.map((notice, index) => (
                <NoticeItem
                  key={notice.id}
                  notice={notice}
                  onNoticeClick={handleNoticeClick}
                  index={index}
                />
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2 my-8">
              <Pagination />
            </div>
            <div className="flex justify-center mt-1">
              <PostButton onClick={handleWriteClick} />
            </div>
          </>
        );
      case "review":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">후기가 없습니다.</p>
          </div>
        );
      case "schedule":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">예정된 일정이 없습니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-8">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <span className="text-xl font-bold mb-2">공지</span>
        <p className="text-gray-600 text-sm pt-2 py-4">
          전체 {notices.length}건
        </p>
        {renderContent()}
      </div>
    </div>
  );
};

export default NoticeList;
