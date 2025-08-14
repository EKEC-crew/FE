import type { BulletinCommentData } from "../../../../../types/bulletin/types";
import CommentItem from "./CommentItem";
import { canViewComment } from "../utils/commentUtils";

type Props = {
  comments: BulletinCommentData[];
  currentUserId?: number;
  bulletinAuthorId?: number;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onReport: () => void;
  onSaveEdit: (commentId: number, content: string, isPrivate: boolean) => void;
  editingCommentId: number | null;
  editContent: string;
  setEditContent: (content: string) => void;
  onCancelEdit: () => void;
};

const CommentList = ({
  comments,
  currentUserId,
  bulletinAuthorId,
  onEdit,
  onDelete,
  onReport,
  onSaveEdit,
  editingCommentId,
  editContent,
  setEditContent,
  onCancelEdit,
}: Props) => {
  const visibleComments = comments.filter((comment) =>
    canViewComment(comment, currentUserId, bulletinAuthorId)
  );

  if (visibleComments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {visibleComments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          currentUserId={currentUserId}
          bulletinAuthorId={bulletinAuthorId}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
          onSaveEdit={onSaveEdit}
          editingCommentId={editingCommentId}
          editContent={editContent}
          setEditContent={setEditContent}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
};

export default CommentList;
