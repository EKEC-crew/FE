import iconHeart from "../../../assets/schedule/ic_Heart.svg";
import iconLikedHeart from "../../../assets/icons/ic_liked_heart.svg";
import iconComment from "../../../assets/icons/ic_comment.svg";
import iconShare from "../../../assets/schedule/ic_Share.svg";
import iconDown from "../../../assets/schedule/ic_Down.svg";

type Props = {
  isCommentOpen: boolean;
  toggleComment: () => void;
  isAuthor?: boolean;
  onEdit?: () => void;
  onGoToList?: () => void;
  onDelete?: () => void;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  onLikeToggle?: () => void;
};

const ScheduleAction = ({
  isCommentOpen,
  toggleComment,
  isAuthor = false,
  onEdit,
  onGoToList,
  onDelete,
  likeCount = 0,
  commentCount = 0,
  isLiked = false,
  onLikeToggle,
}: Props) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onLikeToggle}
          className="flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          <img
            src={isLiked ? iconLikedHeart : iconHeart}
            alt="좋아요"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-600">{likeCount}</span>
        </button>

        <button
          className="bg-white px-3 py-0.5 rounded-2xl text-sm flex items-center gap-1"
          onClick={toggleComment}
        >
          <img src={iconComment} alt="댓글" className="w-5 h-5" />
          <span className="text-gray-600 w-5 h-5">{commentCount}</span>
        </button>
        <button>
          <img src={iconShare} alt="공유" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* 작성자만 수정/삭제 버튼 표시 */}
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

export default ScheduleAction;
