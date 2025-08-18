import { useEffect, useState } from "react";
import iconHeart from "../../../../assets/schedule/ic_Heart.svg";
import iconLikedHeart from "../../../../assets/icons/ic_liked_heart.svg";
import iconComment from "../../../../assets/icons/ic_comment.svg";
import iconShare from "../../../../assets/schedule/ic_Share.svg";

type Props = {
  isCommentOpen: boolean;
  toggleComment: () => void;
  initialLikeCount?: number;
  initialLiked?: boolean;

  commentCount?: number;
  isAuthor?: boolean;
  onEdit?: () => void;
  onGoToList?: () => void;
  onDelete?: () => void;
  onLikeToggle?: (nextLiked: boolean) => void; 
};

const NoticeAction = ({
  isCommentOpen,
  toggleComment,
  initialLikeCount = 0,
  initialLiked = false,
  commentCount = 0,
  isAuthor = false,
  onEdit,
  onGoToList,
  onDelete,
  onLikeToggle,
}: Props) => {
  const [liked, setLiked] = useState<boolean>(initialLiked);
  const [count, setCount] = useState<number>(initialLikeCount);

  // 외부 값 변경 시 동기화
  useEffect(() => setLiked(initialLiked), [initialLiked]);
  useEffect(() => setCount(initialLikeCount), [initialLikeCount]);

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
    onLikeToggle?.(next);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      {/* 좌측: 좋아요/댓글/공유 */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <img
            src={liked ? iconLikedHeart : iconHeart}
            alt="좋아요"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-600">{count}</span>
        </button>

        <button
          className="bg-white px-3 py-0.5 rounded-2xl text-sm flex items-center gap-1 hover:bg-gray-50 transition"
          onClick={toggleComment}
          aria-pressed={isCommentOpen}
          aria-label="댓글 열기"
        >
          <img src={iconComment} alt="댓글" className="w-5 h-5" />
          <span className="text-gray-600">{commentCount}</span>
        </button>

        <button
          className="hover:opacity-80 transition-opacity"
          aria-label="공유"
          type="button"
        >
          <img src={iconShare} alt="공유" className="w-5 h-5" />
        </button>
      </div>

      {/* 우측: 수정/삭제/목록 */}
      <div className="flex items-center gap-2">
        {isAuthor && (
          <>
            <button
              className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm hover:bg-gray-50 cursor-pointer"
              onClick={onEdit}
            >
              수정
            </button>
            <button
              className="bg-white border border-gray-300 px-3 py-0.5 rounded-2xl text-sm hover:bg-gray-50 cursor-pointer"
              onClick={onDelete}
            >
              삭제
            </button>
          </>
        )}
        <button
          className="bg-gray-200 px-3 py-0.5 rounded-2xl text-sm hover:bg-gray-300 cursor-pointer"
          onClick={onGoToList}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default NoticeAction;
