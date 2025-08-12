import iconHeartOutline from "../../../../assets/schedule/ic_Heart.svg";
import iconHeartFilled from "../../../../assets/icons/ic_heart_co_40.svg";
import iconShare from "../../../../assets/schedule/ic_Share.svg";
import iconDown from "../../../../assets/schedule/ic_Down.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNotice, likeNotice } from "../constants";

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

const handleLike = async () => {
  if (!crewId || !noticeId || pending) return;

  // 이미 좋아요면 그냥 종료 (버튼도 disabled라면 이 가드로 충분)
  if (liked) return;

  setPending(true);

  const prev = { liked, likeCount };
  setLiked(true);
  setLikeCount((c) => c + 1);

  try {
    const res = await likeNotice(crewId, noticeId);

    if (res?.resultType !== "SUCCESS") {
      throw res?.error ?? new Error("좋아요 실패");
    }

    const serverLiked = res.data?.isLiked ?? true;
    const serverCount = res.data?.likeCount ?? prev.likeCount + 1;
    setLiked(serverLiked);
    setLikeCount(serverCount);

    // 목록/상세 캐시 무효화
    await queryClient.invalidateQueries({ queryKey: ["notice", Number(crewId), Number(noticeId)] });
    await queryClient.invalidateQueries({ queryKey: ["notices", crewId] });
  } catch (e: any) {
    // 롤백
    setLiked(prev.liked);
    setLikeCount(prev.likeCount);

    // 이미 좋아요인 경우: 카운트 올리지 말고 서버 상태로 동기화
    const code = e?.errorCode || e?.message;
    if (code === "ALREADY_LIKED") {
      setLiked(true);
      await queryClient.invalidateQueries({ queryKey: ["notice", Number(crewId), Number(noticeId)] });
      alert("이미 좋아요를 눌렀습니다.");
      return;
    }
    alert(`좋아요 중 오류가 발생했습니다: ${e?.reason || e?.message || "알 수 없는 오류"}`);
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
        <button onClick={handleLike} disabled={pending || liked}>
          <img
            src={liked ? iconHeartFilled : iconHeartOutline}
            alt="좋아요"
            className={`w-5 h-5 ${pending ? 'opacity-50' : ''} ${liked ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
          />
        </button>
        {likeCount > 0 && (
          <span className="text-sm text-gray-600">{likeCount}</span>
        )}
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
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isCommentOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm"
          onClick={() =>
            navigate(`/crew/${crewId}/notice/${noticeId}/edit`)
          }
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