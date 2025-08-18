import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../components/detail/header";
import Tabs from "../../../../components/detail/tabs";
import NoticeAction from "./NoticeAction";
import NoticeComments from "./NoticeComments";
import NoticeAbout from "./NoticeAbout";
import { getNoticeDetail } from "../constants";
import type { Notice } from "../../../../types/notice/types";

const NoticeDetail = () => {
  const { crewId, noticeId } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  useEffect(() => {
    if (!crewId || !noticeId) return;

    (async () => {
      try {
        const res = await getNoticeDetail(crewId, noticeId);
        if (res.resultType === "SUCCESS") {
          const n = res.data;

          const [date, timeWithMs] = String(n.createdAt ?? "").split("T");
          const time = timeWithMs?.slice(0, 5) || "";

          const mappedNotice = {
            id: n.id,
            title: n.title,
            content: n.content, // HTML 본문
            date,
            time,
            hasLabel: n.type === 1,
            labelText: n.type === 1 ? "필독" : "번개",
            likeCount: Number(n.totalLikes ?? 0),
            liked: Boolean(n.isLiked),
          };

          setNotice(mappedNotice as any);
        }
      } catch (error) {
        console.error("공지 상세 조회 실패:", error);
      }
    })();
  }, [crewId, noticeId]);

  if (!notice) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">공지사항을 불러오는 중...</p>
      </div>
    );
  }

  // content를 안전하게 문자열화
  const contentHtml = String(notice.content ?? "");

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12">
        <div className="py-3">
          <Header />
          <Tabs />
        </div>

        <div className="px-6 py-6 space-y-3 pt-0">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* 제목 + 라벨 */}
            <div className="flex items-center space-x-2">
              {notice.hasLabel && notice.labelText && (
                <span className="bg-[#3A3ADB] text-white text-xs px-2 py-0.5 rounded-full">
                  {notice.labelText}
                </span>
              )}
              <h2 className="text-xl font-bold">{notice.title}</h2>
            </div>

            {/* 메타 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-2">
                <p className="text-sm text-gray-500">{notice.date}</p>
                <p className="text-sm text-gray-500">{notice.time}</p>
              </div>
              <button className="bg-[#3A3ADB] text-white font-semibold px-5 py-1.5 rounded-xl text-sm">
                신청완료
              </button>
            </div>

            {/* 본문 */}
            <NoticeAbout content={contentHtml} />

            {/* 액션 & 댓글 */}
            <NoticeAction
              isCommentOpen={isCommentOpen}
              toggleComment={() => setIsCommentOpen((prev) => !prev)}
              initialLikeCount={notice.likeCount}
              initialLiked={Boolean(notice.liked)}
            />
            <NoticeComments
              isOpen={isCommentOpen}
              crewId={crewId ?? ""}
              noticeId={noticeId ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
