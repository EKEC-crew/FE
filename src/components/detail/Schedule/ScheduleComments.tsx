import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateComment } from "../../../hooks/schedule/useCreateComment";
import { useGetComments } from "../../../hooks/schedule/useGetComments";
import { useAuthStore } from "../../../store/useAuthStore";
import type { CommentData } from "../../../types/detail/schedule/types";
import CommentDropdown from "./CommentDropdown";
import Pagination from "../bulletin/button/pagination";
import ProfileImage from "../../common/ProfileImage";

type Props = {
  isOpen: boolean;
  crewId: string;
  planId: string;
  scheduleAuthorId?: number; // 게시글 작성자 ID
};

const ScheduleComments = ({
  isOpen,
  crewId,
  planId,
  scheduleAuthorId,
}: Props) => {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [page, setPage] = useState(1);

  const { user, status } = useAuthStore();
  const createCommentMutation = useCreateComment(crewId, planId);

  // 댓글 목록 조회
  const { data: commentsData } = useGetComments(crewId, planId, page, 10);
  const comments = commentsData?.data?.comments || [];
  const pagination = commentsData?.data?.pagination;

  // 로그인 체크
  const isLoggedIn = status === "authenticated" && !!user;
  const currentUserId = user?.id;
  const handleSubmit = async () => {
    // 디버깅을 위한 로그인 상태 출력
    console.log("🔍 로그인 상태 체크:", { status, user: !!user, isLoggedIn });

    // 로그인 체크 먼저
    if (!isLoggedIn) {
      alert("댓글 작성을 위해 로그인이 필요합니다.");
      return;
    }

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await createCommentMutation.mutateAsync({
        content: content.trim(),
        isPublic: !isPrivate,
      });
      setContent("");
      setIsPrivate(false);
    } catch (error) {
      console.error("댓글 작성 오류:", error);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift+Enter는 줄바꿈, Enter는 전송
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (content.trim()) handleSubmit();
    }
  };

  // 댓글 표시 권한
  const canViewComment = (comment: CommentData) => {
    if (comment.isPublic === true) return true;
    return (
      currentUserId === scheduleAuthorId || currentUserId === comment.userId
    );
  };

  // 댓글 내용 표시 (비공개 댓글 처리)
  const getCommentContent = (comment: CommentData) => {
    if (comment.isPublic === true) return comment.content;
    if (
      currentUserId === scheduleAuthorId ||
      currentUserId === comment.userId
    ) {
      return comment.content;
    }
    return "비공개 댓글입니다.";
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes === 0 ? "방금 전" : `${diffInMinutes}분 전`;
      }
      return `${diffInHours}시간 전`;
    }
    return `${diffInDays}일 전`;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // 드롭다운 액션 핸들러
  const handleEdit = (commentId: number) => {
    console.log("수정 클릭:", commentId);
    // TODO: 수정 기능 구현
  };

  const handleDelete = (commentId: number) => {
    console.log("삭제 클릭:", commentId);
    // TODO: 삭제 기능 구현
  };

  const handleReport = (commentId: number) => {
    console.log("신고 클릭:", commentId);
    // TODO: 신고 기능 구현
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="comments"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 overflow-hidden mt-4 px-2"
        >
          {/* 댓글 작성 영역 */}
          <div className="space-y-3 w-full">
            {/* 체크박스 */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
              비공개 (작성자와 나만 볼 수 있음)
            </label>

            {/* 입력창, 버튼 */}
            <div className="flex items-stretch gap-3 w-full">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="댓글을 입력하세요."
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#3A3ADB33] min-w-0"
              />
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="h-20 min-w-[80px] px-4 rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 hover:bg-[#2a2ac0] disabled:hover:bg-gray-400"
                style={{
                  backgroundColor: !content.trim() ? "#9CA3AF" : "#3A3ADB",
                }}
              >
                등록
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-2">
            {comments.filter(canViewComment).map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F6F7FA] px-4 py-3 rounded-lg shadow-sm text-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-2 w-[90px] shrink-0">
                  <ProfileImage
                    imageUrl={comment.writerImage}
                    alt={`${comment.writer} 프로필`}
                    size="sm"
                  />
                  <span className="text-gray-400 text-xs">
                    {comment.writer || "0000님"}
                  </span>
                </div>
                <div className="flex-1 px-2 text-gray-800 whitespace-pre-wrap">
                  {getCommentContent(comment)}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-400 text-sm">
                    {formatDate(comment.createdAt)}
                  </span>
                  {comment.isPublic === false && (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                      비공개
                    </span>
                  )}
                  <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm cursor-pointer">
                    답글
                  </button>
                  <CommentDropdown
                    isAuthor={currentUserId === comment.userId}
                    onEdit={() => handleEdit(comment.id)}
                    onDelete={() => handleDelete(comment.id)}
                    onReport={() => handleReport(comment.id)}
                  />
                </div>
              </div>
            ))}

            {/* 댓글이 없을 때 */}
            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                아직 댓글이 없습니다.
              </div>
            )}
          </div>

          {/* 페이지네이션 */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleComments;
