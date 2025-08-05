import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../../components/detail/header";
import Tabs from "../../../../components/detail/tabs";
import ScheduleNotice from "../../../../components/detail/Schedule/ScheduleNotice";
import ScheduleAction from "../../../../components/detail/Schedule/ScheduleAction";
import ScheduleComments from "../../../../components/detail/Schedule/ScheduleComments";
import { generateNoticeData } from "../../../../components/detail/notice/constants";
import type { Notice } from "../../../../components/detail/notice/types";

const NoticeDetail = () => {
  const { id, crewId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

  useEffect(() => {
    if (id) {
      // 실제 프로젝트에서는 API 호출로 대체
      const notices = generateNoticeData();
      const foundNotice = notices.find((n) => n.id === parseInt(id));

      if (foundNotice) {
        setNotice(foundNotice);
      } else {
        // 공지사항을 찾을 수 없는 경우 목록으로 리다이렉트
        navigate(`/crew/${crewId}/notice`);
      }
    }
  }, [id, navigate]);

  if (!notice) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12">
        {/* 상단 Header + Tabs */}
        <div>
          <Header />
          <Tabs />
        </div>

        {/* 본문 콘텐츠 */}
        <div className="px-6 py-6 space-y-3 pt-0">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* 제목 + 태그 */}
            <div className="flex items-center space-x-2">
              {notice.hasLabel && notice.labelText && (
                <span className="bg-[#3A3ADB] text-white text-xs px-2 py-0.5 rounded-full">
                  {notice.labelText}
                </span>
              )}
              <h2 className="text-xl font-bold">{notice.title}</h2>
            </div>

            {/* 작성자 정보 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-2">
                <p className="text-sm text-gray-500">{notice.date}</p>
                <p className="text-sm text-gray-500">{notice.time}</p>
              </div>
              <button className="bg-[#3A3ADB] text-white font-semibold px-5 py-1.5 rounded-xl text-sm">
                신청완료
              </button>
            </div>

            {/* 공지 영역 */}
            <ScheduleNotice />

            {/* 버튼 영역 */}
            <ScheduleAction
              isCommentOpen={isCommentOpen}
              toggleComment={() => setIsCommentOpen((prev) => !prev)}
            />

            {/* 댓글 영역 */}
            <ScheduleComments isOpen={isCommentOpen} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
