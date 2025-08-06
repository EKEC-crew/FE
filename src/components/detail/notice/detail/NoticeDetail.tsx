import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../../components/detail/header";
import Tabs from "../../../../components/detail/tabs";
import NoticeAbout from "./NoticeAbout";
import NoticeAction from "./NoticeAction";
import NoticeComments from "./NoticeComments";
import { generateNoticeData } from "../constants";
import type { Notice } from "../../../../types/notice/types";

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

  useEffect(() => {
    if (!id) return;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) return;

    const notices = generateNoticeData();
    const found = notices.find((n) => n.id === parsedId);
    if (found) setNotice(found);
  }, [id]);

  if (!notice) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">공지사항을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12">
        <Header />
        <Tabs />
        <div className="px-6 py-6 space-y-3 pt-0">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="flex items-center space-x-2">
              {notice.hasLabel && notice.labelText && (
                <span className="bg-[#3A3ADB] text-white text-xs px-2 py-0.5 rounded-full">
                  {notice.labelText}
                </span>
              )}
              <h2 className="text-xl font-bold">{notice.title}</h2>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-2">
                <p className="text-sm text-gray-500">{notice.date}</p>
                <p className="text-sm text-gray-500">{notice.time}</p>
              </div>
              <button className="bg-[#3A3ADB] text-white font-semibold px-5 py-1.5 rounded-xl text-sm">
                신청완료
              </button>
            </div>

            <NoticeAbout />
            <NoticeAction
              isCommentOpen={isCommentOpen}
              toggleComment={() => setIsCommentOpen((prev) => !prev)}
            />
            <NoticeComments isOpen={isCommentOpen} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
