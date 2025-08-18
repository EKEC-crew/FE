import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoticeItem from "../notice/NoticeItem";
import Pagination from "../notice/button/pagination";
import PostButton from "../notice/button/post";
import type { Notice } from "../../../types/notice/types";
import { fetchNoticeList } from "./constants";
import { fetchMyRole as fetchMyRoleDetail } from "../constants";

// API 응답 타입 정의 - 새로운 API 구조에 맞춰 수정
interface ApiNoticeData {
  id: number;
  title: string;
  content?: string;
  type: number; // 0: 일반, 1: 필독
  createdAt: string;
  author?: {
    crewMemberId: number;
    role: number;
    nickname: string;
  };
  isLiked?: boolean;
  [key: string]: any;
}

const NoticeList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crewId } = useParams();
  const [activeTab] = useState<string>("notice");
  
  const { data: myRole } = useQuery({
    queryKey: ["myRole", crewId],
    queryFn: () => fetchMyRoleDetail(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
  
  // 역할 기반 권한 체크 개선
  const canPost = React.useMemo(() => {
    if (!myRole) return false;
    const role = typeof myRole === "object" && myRole !== null && "role" in myRole ? (myRole as any).role : myRole;
    if (typeof role === 'string') {
      return role === "LEADER" || role === "MANAGER" || role === "CREW_LEADER" || role === "ADMIN";
    }
    if (typeof role === 'number') {
      return role >= 1; // 1: 운영진, 2: 크루장
    }
    return false;
  }, [myRole]);

  const {
    data: noticesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ["notices", crewId],
    queryFn: () => fetchNoticeList(crewId!, 1, 10),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });

  const notices: Notice[] = React.useMemo(() => {
    console.log("📦 전체 응답 데이터:", noticesResponse);

    const rawNotices = Array.isArray(noticesResponse) 
      ? noticesResponse 
      : [];
    
    console.log("📋 추출된 rawNotices:", rawNotices);

    if (!Array.isArray(rawNotices)) return [];
    
    return rawNotices.map((n: ApiNoticeData): Notice => ({
      id: n.id,
      title: n.title,
      content: n.content || "",
      date: n.createdAt?.split("T")[0] || "",
      time: n.createdAt?.split("T")[1]?.slice(0, 5) || "",
      // type이 1이면 필독 공지
      hasLabel: n.type === 1,
      labelText: n.type === 1 ? "필독" : undefined,
    }));
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
      navigate(`/crew/${crewId}/notice/${notice.id}`);
    },
    [navigate, crewId]
  );

  const handleWriteClick = useCallback(() => {
    if (!crewId) return;
    navigate(`/crew/${crewId}/notice/post`);
  }, [navigate, crewId]);

  if (isError) {
    const msg = error instanceof Error ? error.message : "공지 목록을 불러올 수 없습니다.";
    const isForbidden = /403/.test(msg) || /권한/.test(msg);
    return (
      <div className="flex justify-center min-h-screen bg-gray-50 pt-8">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">
              {isForbidden ? "공지 열람 권한이 없습니다." : "공지사항을 불러오는 중 오류가 발생했습니다."}
            </p>
            <p className="text-sm text-gray-600 mb-4">에러: {msg}</p>
            <button onClick={() => refetch()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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
                    <p className="text-gray-500">등록된 공지가 없어요. 공지를 등록해 주세요.</p>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-center items-center space-x-2 my-8">
              <Pagination />
            </div>
            {canPost && (
              <div className="flex justify-center items-center space-x-4 mt-1">
                <PostButton onClick={handleWriteClick} />
              </div>
            )}
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