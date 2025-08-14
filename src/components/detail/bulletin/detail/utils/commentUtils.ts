import type { BulletinCommentData } from "../../../../../types/bulletin/types";

// 댓글 표시 권한 체크 (0은 전체공개, 1은 비밀댓글)
export const canViewComment = (
  comment: BulletinCommentData,
  currentUserId?: number,
  bulletinAuthorId?: number
) => {
  if (comment.isPublic === 0) return true; // 전체공개
  return currentUserId === bulletinAuthorId || currentUserId === comment.userId;
};

// 댓글 내용 표시 (비공개 댓글 처리)
export const getCommentContent = (
  comment: BulletinCommentData,
  currentUserId?: number,
  bulletinAuthorId?: number
) => {
  if (comment.isPublic === 0) return comment.content; // 전체공개
  if (currentUserId === bulletinAuthorId || currentUserId === comment.userId) {
    return comment.content;
  }
  return "비공개 댓글입니다.";
};

// 날짜 포맷팅
export const formatDate = (dateString: string) => {
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
