import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchNoticeComments } from "../constants";
import {
  createNoticeComment,
  updateNoticeComment,
  deleteNoticeComment,
} from "../constants";
import moreIcon from "../../../../assets/schedule/ic_More.svg";

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
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // 입력창
  const [newContent, setNewContent] = useState("");

  // 편집 상태
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const loadComments = async () => {
    if (!isOpen || !crewId || !noticeId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNoticeComments(crewId, noticeId);
      const list = Array.isArray(response?.data) ? response.data as Comment[] : [];
      if (response.resultType === "SUCCESS") {
        setComments(list);
      } else {
        setError("댓글을 불러오는데 실패했습니다.");
      }
    } catch (err) {
      console.error("댓글 조회 에러:", err);
      setError("댓글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    if (isOpen) loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, crewId, noticeId]);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setMenuOpenId(null);
      }
    };
    if (menuOpenId !== null) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpenId]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      return `${y}.${m}.${d} ${hh}:${mm}`;
    } catch {
      return dateString;
    }
  };

  // 등록
  const handleCreate = async () => {
    const content = newContent.trim();
    if (!content) return;
    setPosting(true);
    try {
      const created = await createNoticeComment(crewId, noticeId, content);
      // 낙관적 반영: 최신이 맨 위
      setComments((prev) => {
        const optimistic = [
          { id: created.id, content: created.content, createdAt: created.createdAt, author: created.author || "나" },
          ...prev,
        ];
        return optimistic;
      });
      setNewContent("");
    } catch (e: any) {
      alert(e?.message ?? "댓글 작성에 실패했습니다.");
    } finally {
      setPosting(false);
    }
  };

  // 편집 시작
  const startEdit = (c: Comment) => {
    setEditingId(c.id);
    setEditingContent(c.content);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };
  // 편집 저장
  const saveEdit = async () => {
    if (editingId == null) return;
    const content = editingContent.trim();
    if (!content) return;
    try {
      const updated = await updateNoticeComment(crewId, noticeId, editingId, content);
      setComments((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, content: updated.content, createdAt: updated.modifiedAt ?? c.createdAt } : c))
      );
      cancelEdit();
    } catch (e: any) {
      alert(e?.message ?? "댓글 수정에 실패했습니다.");
    }
  };

  // 삭제
  const removeComment = async (id: number) => {
    if (!confirm("이 댓글을 삭제할까요?")) return;
    try {
      await deleteNoticeComment(crewId, noticeId, id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      alert(e?.message ?? "댓글 삭제에 실패했습니다.");
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
          className="space-y-4 overflow-visible mt-4"
        >
          {/* 작성 영역 */}
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 bg-white border border-gray-300 rounded-lg p-3 text-sm resize-none h-12"
              placeholder="댓글을 입력하세요."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              disabled={posting}
            />
            <button
              className="bg-[#3A3ADB] text-white text-sm px-4 py-2 rounded-lg h-12 min-w-[60px] disabled:opacity-50"
              onClick={handleCreate}
              disabled={posting || !newContent.trim()}
            >
              {posting ? "등록중" : "등록"}
            </button>
          </div>

          {/* 목록 */}
          <div className="space-y-2">
            {loading && <div className="text-center py-4 text-gray-500">댓글을 불러오는 중...</div>}
            {error && <div className="text-center py-4 text-red-500">{error}</div>}
            {!loading && hasLoaded && !error && comments.length === 0 && (
              <div className="text-center py-4 text-gray-500">아직 댓글이 없습니다.</div>
            )}

            {!loading &&
              !error &&
              comments.map((comment) => {
                const isEditing = editingId === comment.id;
                return (
                  <div
                    key={comment.id}
                    className="bg-[#F6F7FA] px-4 py-3 rounded-lg shadow-sm text-sm flex items-center justify-between relative"
                  >
                    {/* 왼쪽: 프로필(placeholder) + 작성자 */}
                    <div className="flex items-center gap-3 w-[140px] shrink-0">
                      <div className="w-6 h-6 rounded-full bg-gray-300" />
                      <div className="text-gray-700 font-medium truncate max-w-[90px]">
                        {comment.author || "익명"}
                      </div>
                    </div>

                    {/* 중앙: 내용 */}
                    <div className="flex-1 px-2 text-gray-800 min-w-0">
                      {isEditing ? (
                        <textarea
                          className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                      ) : (
                        <span className="break-words whitespace-pre-wrap">{comment.content}</span>
                      )}
                    </div>

                    {/* 오른쪽: 날짜 + 답글 + 더보기 */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-gray-400 text-sm whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                      </span>
                      <button className="px-3 py-1 rounded-2xl border border-gray-300 bg-white text-sm">
                        답글
                      </button>

                      {/* 더보기 */}
                      <button
                        className="w-6 h-6 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId((prev) => (prev === comment.id ? null : comment.id));
                        }}
                        aria-label="more"
                      >
                        <img src={moreIcon} alt="더보기" className="w-6 h-6" />
                      </button>

                      {/* 메뉴 */}
                      {menuOpenId === comment.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-2 top-10 z-[9999] w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                        >
                          {!isEditing && (
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                              onClick={() => {
                                setMenuOpenId(null);
                                startEdit(comment);
                              }}
                            >
                              수정하기
                            </button>
                          )}
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                            onClick={() => {
                              setMenuOpenId(null);
                              alert("신고가 접수되었습니다.");
                            }}
                          >
                            신고하기
                          </button>
                          {!isEditing && (
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-600"
                              onClick={() => {
                                setMenuOpenId(null);
                                removeComment(comment.id);
                              }}
                            >
                              삭제하기
                            </button>
                          )}
                          {isEditing && (
                            <div className="pt-2 border-t border-gray-100">
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                onClick={() => {
                                  setMenuOpenId(null);
                                  saveEdit();
                                }}
                              >
                                저장
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                                onClick={() => {
                                  setMenuOpenId(null);
                                  cancelEdit();
                                }}
                              >
                                취소
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeComments;
