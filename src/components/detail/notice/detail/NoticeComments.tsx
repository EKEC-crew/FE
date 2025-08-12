import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchNoticeComments } from "../constants";

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: string;
};

type Props = {
  isOpen: boolean;
  crewId: string;
  noticeId: string;
};

const NoticeComments = ({ isOpen, crewId, noticeId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 댓글 목록 조회
  const loadComments = async () => {
    if (!isOpen || !crewId || !noticeId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchNoticeComments(crewId, noticeId);
      
      if (response.resultType === "SUCCESS") {
        setComments(response.data || []);
      } else {
        setError("댓글을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("댓글 조회 에러:", err);
      setError("댓글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 댓글창이 열릴 때마다 댓글 목록 조회
  useEffect(() => {
    if (isOpen) {
      loadComments();
    }
  }, [isOpen, crewId, noticeId]);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}.${month}.${day} ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
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
          className="space-y-4 overflow-hidden mt-4"
        >
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none h-12"
              placeholder="댓글을 입력하세요."
            />
            <button className="bg-[#3A3ADB] text-white text-sm px-4 py-2 rounded-lg h-12 min-w-[60px]">
              등록
            </button>
          </div>

          <div className="space-y-2">
            {loading && (
              <div className="text-center py-4 text-gray-500">
                댓글을 불러오는 중...
              </div>
            )}

            {error && (
              <div className="text-center py-4 text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && comments.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                아직 댓글이 없습니다.
              </div>
            )}

            {!loading && !error && comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#F6F7FA] px-4 py-3 rounded-lg shadow-sm text-sm flex items-center justify-between"
              >
                <div className="text-gray-400 w-[70px] shrink-0">
                  {comment.author || "익명"}
                </div>
                <div className="flex-1 px-2 text-gray-800">
                  {comment.content}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-gray-400 text-sm">
                    {formatDate(comment.createdAt)}
                  </span>
                  <button className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm">
                    댓글
                  </button>
                  <button>
                    <img src="/schedule/iconMore.svg" alt="더보기" />
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

export default NoticeComments;