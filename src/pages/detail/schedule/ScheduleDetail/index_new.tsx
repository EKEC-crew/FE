import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScheduleDetail } from "../../../../hooks/schedule/useScheduleDetail";
import { useDeleteSchedule } from "../../../../hooks/schedule/useDeleteSchedule";
import { useScheduleApply } from "../../../../hooks/schedule/useScheduleApply";
import { useScheduleLikeState } from "../../../../hooks/schedule/useScheduleLikeState";
import { useAuthStore } from "../../../../store/useAuthStore";
import Header from "../../../../components/detail/header";
import Tabs from "../../../../components/detail/tabs";
import ScheduleNotice from "../../../../components/detail/Schedule/ScheduleNotice";
import ScheduleAction from "../../../../components/detail/Schedule/ScheduleAction";
import ScheduleComments from "../../../../components/detail/Schedule/ScheduleComments";
import ScheduleHeader from "../../../../components/detail/Schedule/ScheduleHeader";
import ScheduleApplyButton from "../../../../components/detail/Schedule/ScheduleApplyButton";
import ScheduleApplyCompleteModal from "../../../../components/detail/Schedule/ScheduleApplyCompleteModal";

const ScheduleDetail = () => {
  const { crewId, id } = useParams<{ crewId: string; id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useScheduleDetail(crewId || "", id || "");
  const deleteScheduleMutation = useDeleteSchedule();
  const user = useAuthStore((state) => state.user);

  const {
    showApplyButton,
    showCompleteModal,
    applyMutation,
    handleApplyClick,
    handleConfirmApply,
    handleCancelApply,
    handleCloseModal,
  } = useScheduleApply(crewId || "", id || "");

  const { handleLikeToggle, isLiked } = useScheduleLikeState(
    crewId || "",
    id || "",
    data?.data?.isLiked
  );

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments] = useState([
    { id: 2, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
    { id: 3, text: "확인 완료! 열심히 활동하겠습니다.", date: "2025.06.18" },
  ]);

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
            {/* 일정 헤더 */}
            <ScheduleHeader
              type={schedule.type}
              title={schedule.title}
              writer={schedule.writer}
              day={schedule.day}
              isApplied={schedule.isApplied || false}
              isPending={applyMutation.isPending}
              onApplyClick={() => handleApplyClick(schedule.isApplied || false)}
            />

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

            {/* 신청 버튼 영역 */}
            {showApplyButton && (
              <ScheduleApplyButton
                onConfirm={handleConfirmApply}
                onCancel={handleCancelApply}
                isPending={applyMutation.isPending}
                hasFee={schedule.hasFee}
              />
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
              isLiked={isLiked}
              onLikeToggle={handleLikeToggle}
            />

            {/* 댓글 영역 */}
            <ScheduleComments isOpen={isCommentOpen} comments={comments} />
          </div>
        </div>
      </div>

      {/* 신청 완료 모달 */}
      <ScheduleApplyCompleteModal
        isOpen={showCompleteModal}
        onClose={handleCloseModal}
        hasFee={schedule.hasFee}
      />
    </div>
  );
};

export default ScheduleDetail;
