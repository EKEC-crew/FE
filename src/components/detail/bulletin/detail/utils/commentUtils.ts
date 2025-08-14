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

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
