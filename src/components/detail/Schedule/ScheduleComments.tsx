import { useState } from "react";
import iconMore from "../../../assets/schedule/ic_More.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateComment } from "../../../hooks/schedule/useCreateComment";
import { useAuthStore } from "../../../store/useAuthStore";

type Comment = {
  id: number;
  text: string;
  date: string;
  writer?: string;
  isPublic?: boolean;
  userId?: number;
};

type Props = {
  isOpen: boolean;
  comments: Comment[];
  crewId: string;
  planId: string;
  currentUserId?: number;
  scheduleAuthorId?: number; // 게시글 작성자 ID
};

const ScheduleComments = ({
  isOpen,
  comments,
  crewId,
  planId,
  currentUserId,
  scheduleAuthorId,
}: Props) => {
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { user, status } = useAuthStore();
  const createCommentMutation = useCreateComment(crewId, planId);

  // 로그인 체크 (status가 authenticated이고 user가 있어야 로그인 상태로 간주)
  const isLoggedIn = status === "authenticated" && !!user;

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
  const canViewComment = (comment: Comment) => {
    if (comment.isPublic === true) return true;
    return (
      currentUserId === scheduleAuthorId || currentUserId === comment.userId
    );
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
                <div className="text-gray-400 w-[70px] shrink-0">
                  {comment.writer || "0000님"}
                </div>
                <div className="flex-1 px-2 text-gray-800">{comment.text}</div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-400 text-sm">{comment.date}</span>
                  {comment.isPublic === false && (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
                      비공개
                    </span>
                  )}
                  <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm">
                    댓글
                  </button>
                  <button>
                    <img src={iconMore} alt="더보기" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleComments;
