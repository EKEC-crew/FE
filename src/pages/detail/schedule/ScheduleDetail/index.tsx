import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScheduleDetail } from "../../../../hooks/schedule/useScheduleDetail";
import { useDeleteSchedule } from "../../../../hooks/schedule/useDeleteSchedule";
import {
  useLikeSchedule,
  useUnlikeSchedule,
} from "../../../../hooks/schedule/useScheduleLike";
import { useAuthStore } from "../../../../store/useAuthStore";
import Header from "../../../../components/detail/header";
import Tabs from "../../../../components/detail/tabs";
import ScheduleNotice from "../../../../components/detail/Schedule/ScheduleNotice";
import ScheduleAction from "../../../../components/detail/Schedule/ScheduleAction";
import ScheduleComments from "../../../../components/detail/Schedule/ScheduleComments";

const ScheduleDetail = () => {
  const { crewId, id } = useParams<{ crewId: string; id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useScheduleDetail(crewId || "", id || "");
  const deleteScheduleMutation = useDeleteSchedule();
  const likeScheduleMutation = useLikeSchedule(crewId || "");
  const unlikeScheduleMutation = useUnlikeSchedule(crewId || "");
  const user = useAuthStore((state) => state.user);

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [localLikeState, setLocalLikeState] = useState<{
    [planId: string]: boolean;
  }>({});
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

  // 에러 발생 시 로컬 상태 초기화
  useEffect(() => {
    if (likeScheduleMutation.isError && id) {
      setLocalLikeState((prev) => ({ ...prev, [id]: false }));
    }
    if (unlikeScheduleMutation.isError && id) {
      setLocalLikeState((prev) => ({ ...prev, [id]: true }));
    }
  }, [likeScheduleMutation.isError, unlikeScheduleMutation.isError, id]);

  // 목록으로 돌아가기
  const handleGoToList = () => {
    navigate(`/crew/${crewId}/schedule`);
  };

  // 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/crew/${crewId}/schedule/${id}/edit`);
  };

  // 일정 삭제
  const handleDelete = () => {
    if (!crewId || !id) {
      alert("크루 ID 또는 일정 ID가 없습니다.");
      return;
    }

    if (window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      deleteScheduleMutation.mutate({
        crewId,
        planId: id,
      });
    }
  };

  // 좋아요 토글
  const handleLikeToggle = () => {
    if (!crewId || !id) {
      console.error("크루 ID 또는 일정 ID가 없습니다.");
      return;
    }

    // 현재 좋아요 상태 확인 - 로컬 상태를 우선 확인, 없으면 서버 데이터 확인
    const serverLikeStatus = data?.data?.isLiked ?? false;
    const currentLikeStatus = localLikeState[id] ?? serverLikeStatus;

    console.log(
      "🔄 [LIKE ACTION] 로컬상태:",
      localLikeState[id],
      "서버상태:",
      serverLikeStatus,
      "최종상태:",
      currentLikeStatus,
      "API:",
      currentLikeStatus ? "DELETE" : "POST"
    );

    if (currentLikeStatus === true) {
      // 이미 좋아요를 눌렀다면 좋아요 취소
      setLocalLikeState((prev) => ({ ...prev, [id]: false }));
      unlikeScheduleMutation.mutate(id);
    } else {
      // 좋아요를 누르지 않았다면 좋아요
      setLocalLikeState((prev) => ({ ...prev, [id]: true }));
      likeScheduleMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">일정을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !data || data.resultType === "FAIL") {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          {data?.error?.reason || "일정을 불러오는데 실패했습니다."}
        </div>
      </div>
    );
  }

  const schedule = data.data;
  if (!schedule) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">일정 정보가 없습니다.</div>
      </div>
    );
  }

  const isAuthor = user?.id === schedule.userId;

  console.log("작성자 여부:", isAuthor);
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
              <span
                className={`text-white text-xs px-2 py-0.5 rounded-full ${
                  schedule.type === 0 ? "bg-[#3A3ADB]" : "bg-[#72EDF2]"
                }`}
              >
                {schedule.type === 0 ? "정기" : "번개"}
              </span>
              <h2 className="text-xl font-bold">{schedule.title}</h2>
            </div>

            {/* 작성자 정보 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex py-1 items-center gap-2">
                <p className="text-sm text-gray-600">{schedule.writer}님</p>
                <p className="text-sm text-gray-500">
                  {new Date(schedule.day)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, ".")
                    .slice(0, -1)}
                </p>
              </div>
              <button
                className={`font-semibold px-5 py-1.5 rounded-xl text-sm ${
                  schedule.isRequired
                    ? "bg-[#3A3ADB] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {schedule.isRequired ? "신청하기" : "참고용"}
              </button>
            </div>

            {/* 공지 영역 */}
            <ScheduleNotice content={schedule.content} />

            {/* 회비 정보 */}
            {schedule.hasFee && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">
                  💰 회비: {schedule.fee.toLocaleString()}원
                </p>
                {schedule.feePurpose && (
                  <p className="text-xs text-blue-600 mt-1">
                    사용 목적: {schedule.feePurpose}
                  </p>
                )}
              </div>
            )}

            {/* 버튼 영역 */}
            <ScheduleAction
              isCommentOpen={isCommentOpen}
              toggleComment={() => setIsCommentOpen((prev) => !prev)}
              isAuthor={isAuthor}
              onEdit={handleEdit}
              onGoToList={handleGoToList}
              onDelete={handleDelete}
              likeCount={data?.data?.likeCount || 0}
              commentCount={data?.data?.commentCount || 0}
              isLiked={
                id
                  ? (localLikeState[id] ?? data?.data?.isLiked ?? false)
                  : false
              }
              onLikeToggle={handleLikeToggle}
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
