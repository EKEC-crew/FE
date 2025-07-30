import React, { useState, useCallback } from "react";
import NoticeItem from "../notice/notice";
import Pagination from "../notice/button/pagination";
import PostButton from "../notice/button/post";
import type { Notice } from "../notice/types";
import { generateNoticeData } from "../notice/constants";

const NoticeList: React.FC = () => {

  const [activeTab] = useState<string>("notice");
  const [notices] = useState<Notice[]>(generateNoticeData());

  const handleNoticeClick = useCallback((notice: Notice) => {
    console.log("공지사항 클릭:", notice);
    // 실제 구현에서는 라우터를 통해 상세 페이지로 이동
  }, []);

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

            {/* 페이지네이션 */}
            <div className="flex justify-center items-center space-x-2 my-8">
              <Pagination />
            </div>

            {/* 글쓰기 버튼 */}
            <div className="flex justify-center mt-1">
              <PostButton />
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
        <p className="text-gray-600 text-sm pt-2 py-4"> 전체 00건</p>
        {renderContent()}
      </div>
    </div>
  );
};

export default NoticeList;
