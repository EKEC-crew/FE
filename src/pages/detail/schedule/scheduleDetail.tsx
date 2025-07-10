import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";
import ScheduleNotice from "../../../components/ScheduleDetail/ScheduleNotice";
import ScheduleAction from "../../../components/ScheduleDetail/ScheduleAction";
import ScheduleComments from "../../../components/ScheduleDetail/ScheduleComments";

const ScheduleDetail = () => {
  const { id } = useParams();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

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
              <span className="bg-[#3A3ADB] text-white text-xs px-2 py-0.5 rounded-full">
                정기
              </span>
              <h2 className="text-xl font-bold">
                잠실 2030 여성 야구 직관 동호회
              </h2>
            </div>

            {/* 작성자 정보 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-2">
                <p className="text-sm text-gray-600">000님</p>
                <p className="text-sm text-gray-500">2025.06.18</p>
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

export default ScheduleDetail;
