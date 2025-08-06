import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeItem from "../notice/NoticeItem";
import Pagination from "../notice/button/pagination";
import PostButton from "../notice/button/post";
import type { Notice } from "../../../types/notice/types";
import { fetchNoticeList } from "./constants";

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const [activeTab] = useState<string>("notice");
  const [notices, setNotices] = useState<Notice[]>([]);

  // ✅ 공지사항 불러오기
  useEffect(() => {
    const loadNotices = async () => {
      if (!crewId) return;

      try {
        const response = await fetchNoticeList(crewId);
        console.log("📦 공지사항 응답:", response);

        if (response.resultType === "SUCCESS" && Array.isArray(response.data)) {
          setNotices(response.data);
        } else {
          console.warn("❗ 공지사항 응답이 배열이 아님:", response);
          setNotices([]);
        }
      } catch (err) {
        console.error("공지사항 로딩 오류:", err);
        setNotices([]);
      }
    };

    loadNotices();
  }, [crewId]);

  // ✅ 상세 이동
  const handleNoticeClick = useCallback(
    (notice: Notice) => {
      if (!crewId) return;
      navigate(`/crew/${crewId}/notice/${notice.id}`);
    },
    [navigate, crewId]
  );

  // ✅ 글쓰기 이동
  const handleWriteClick = useCallback(() => {
    if (!crewId) return;
    navigate(`/crew/${crewId}/notice/post`);
  }, [navigate, crewId]);

  // ✅ 렌더링 분기
  const renderContent = () => {
    switch (activeTab) {
      case "notice":
        return (
          <>
            <div className="space-y-2">
              {Array.isArray(notices) &&
                notices.map((notice, index) => (
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
