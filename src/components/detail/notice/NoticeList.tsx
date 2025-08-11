import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoticeItem from "../notice/NoticeItem";
import Pagination from "../notice/button/pagination";
import PostButton from "../notice/button/post";
import type { Notice } from "../../../types/notice/types";
import { fetchNoticeList } from "./constants";

// API 응답 타입 정의
interface ApiNoticeData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  hasLabel?: boolean;
  labelText?: string;
  [key: string]: any;
}

interface NoticeApiResponse {
  resultType: string;
  message: string;
  data: {
    data: ApiNoticeData[];
  };
}

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crewId } = useParams();
  const [activeTab] = useState<string>("notice");

  const {
    data: noticesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<NoticeApiResponse>({
    queryKey: ["notices", crewId],
    queryFn: () => fetchNoticeList(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const notices: Notice[] = React.useMemo(() => {
    console.log("📦 전체 응답 데이터:", noticesResponse);
    const rawNotices = noticesResponse?.data?.data;
    console.log("📋 추출된 rawNotices:", rawNotices);

    if (Array.isArray(rawNotices)) {
      return rawNotices.map((n: ApiNoticeData): Notice => ({
        id: n.id,
        title: n.title,
        content: n.content,
        date: n.createdAt?.split("T")[0] || "",
        time: n.createdAt?.split("T")[1]?.slice(0, 5) || "",
        hasLabel: n.hasLabel || false,
        labelText: n.labelText || undefined,
      }));
    }

    return [];
  }, [noticesResponse]);

  useEffect(() => {
    if (location.state?.refresh) {
      refetch();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, refetch, navigate, location.pathname]);

  const handleNoticeClick = useCallback(
    (notice: Notice) => {
      if (!crewId) return;
      // ✅ notice.id로 이동 경로 동적 설정
      navigate(`/crew/${crewId}/notice/${notice.id}`);
    },
    [navigate, crewId]
  );

  const handleWriteClick = useCallback(() => {
    if (!crewId) return;
    navigate(`/crew/${crewId}/notice/post`);
  }, [navigate, crewId]);

  if (isError) {
    return (
      <div className="flex justify-center min-h-screen bg-gray-50 pt-8">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">공지사항을 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-sm text-gray-600 mb-4">
              에러: {error instanceof Error ? error.message : "알 수 없는 오류"}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "notice":
        return (
          <>
            {isLoading && (
              <div className="text-center py-4">
                <p className="text-gray-500">로딩 중...</p>
              </div>
            )}
            <div className="space-y-2">
              {Array.isArray(notices) && notices.length > 0 ? (
                notices.map((notice, index) => (
                  <NoticeItem
                    key={`notice-${notice.id}`}
                    notice={notice}
                    onNoticeClick={handleNoticeClick}
                    index={index}
                  />
                ))
              ) : (
                !isLoading && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">공지사항이 없습니다.</p>
                    <details className="mt-4 text-xs text-gray-400">
                      <summary className="cursor-pointer hover:text-gray-600">
                        디버깅 정보 (개발용)
                      </summary>
                      <div className="mt-2 p-2 bg-gray-100 rounded text-left">
                        <p>crewId: {crewId}</p>
                        <p>
                          응답 데이터:{" "}
                          {JSON.stringify(noticesResponse, null, 2)}
                        </p>
                      </div>
                    </details>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-center items-center space-x-2 my-8">
              <Pagination />
            </div>
            <div className="flex justify-center items-center space-x-4 mt-1">
              <PostButton onClick={handleWriteClick} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-8">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">공지</span>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            {crewId && <span>크루 ID: {crewId}</span>}
            {isLoading && <span className="text-blue-500">🔄</span>}
          </div>
        </div>
        <p className="text-gray-600 text-sm pt-2 py-4">
          전체 {notices.length}건
        </p>
        {renderContent()}
      </div>
    </div>
  );
};

export default NoticeList;
