import iconHeartOutline from "../../../../assets/schedule/ic_Heart.svg";
import iconHeartFilled from "../../../../assets/icons/ic_heart_co_40.svg";
import iconShare from "../../../../assets/schedule/ic_Share.svg";
import iconDown from "../../../../assets/schedule/ic_Down.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNotice, toggleNoticeLike } from "../constants";

type Props = {
  isCommentOpen: boolean;
  toggleComment: () => void;
  initialLikeCount?: number;
  initialLiked?: boolean;
};

const NoticeAction = ({
  isCommentOpen,
  toggleComment,
  initialLikeCount = 0,
  initialLiked = false,
}: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { crewId, noticeId } = useParams();

  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [pending, setPending] = useState(false);

  // props 변경 시 state 동기화
  useEffect(() => setLiked(initialLiked), [initialLiked]);
  useEffect(() => setLikeCount(initialLikeCount), [initialLikeCount]);

  // 공지 삭제
  const handleDelete = async () => {
    if (!crewId || !noticeId) return;
    if (!confirm("정말 이 공지글을 삭제하시겠습니까?")) return;

    try {
      const res = await deleteNotice(crewId, noticeId);
      if (res?.resultType !== "SUCCESS") {
        throw new Error(res?.message || "삭제에 실패했습니다.");
      }
      await queryClient.invalidateQueries({ queryKey: ["notices"] });
      await queryClient.invalidateQueries({ queryKey: ["notices", crewId] });
      navigate(`/crew/${crewId}/notice`);
    } catch (e: any) {
      alert(e?.message || "삭제 중 오류가 발생했습니다.");
    }
  };

  // 좋아요 토글 (낙관적 업데이트)
  const handleToggleLike = async () => {
    if (!crewId || !noticeId || pending) return;

    setPending(true);
    const prev = { liked, likeCount };

    try {
      // 낙관적 반영
      setLiked((v) => !v);
      setLikeCount((c) => (liked ? Math.max(0, c - 1) : c + 1));

      const res = await toggleNoticeLike(crewId, noticeId);
      if (res?.resultType !== "SUCCESS") {
        throw res?.error ?? new Error("좋아요 처리 실패");
      }

      // 서버 응답에 맞춰 정합화
      const serverLiked = res.data?.isLiked;
      const totalLikes = res.data?.totalLikes;
      if (typeof serverLiked === "boolean") setLiked(serverLiked);
      if (typeof totalLikes === "number") setLikeCount(totalLikes);

      // 목록/상세 캐시 무효화로 재검증
      await queryClient.invalidateQueries({ queryKey: ["notice", Number(crewId), Number(noticeId)] });
      await queryClient.invalidateQueries({ queryKey: ["notices", crewId] });
    } catch (e: any) {
      // ❌ 롤백
      setLiked(prev.liked);
      setLikeCount(prev.likeCount);

      alert(`좋아요 처리 중 오류가 발생했습니다: ${e?.reason || e?.message || "알 수 없는 오류"}`);
    } finally {
      setPending(false);
    }
  };

  const handleGoToList = () => {
    navigate(`/crew/${crewId}/notice`);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <button onClick={handleToggleLike} disabled={pending}>
          <img
            src={liked ? iconHeartFilled : iconHeartOutline}
            alt="좋아요"
            className={`w-5 h-5 ${pending ? "opacity-50" : ""} ${liked ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
          />
        </button>
        {likeCount > 0 && <span className="text-sm text-gray-600">{likeCount}</span>}
        <button>
          <img src={iconShare} alt="공유" className="w-5 h-5" />
        </button>
        <button
          className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm flex items-center gap-1"
          onClick={toggleComment}
        >
          댓글
          <img
            src={iconDown}
            alt="댓글 토글"
            className={`w-5 h-5 transform transition-transform duration-200 ${isCommentOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm"
          onClick={() => navigate(`/crew/${crewId}/notice/${noticeId}/edit`)}
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm"
        >
          삭제
        </button>
        <button
          onClick={handleGoToList}
          className="bg-gray-200 px-3 py-0.5 rounded-2xl text-sm hover:bg-gray-300"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default NoticeAction;
