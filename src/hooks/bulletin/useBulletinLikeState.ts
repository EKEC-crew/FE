import { useState, useEffect } from "react";
import { useLikeBulletin, useUnlikeBulletin } from "./useBulletinLike";

export const useBulletinLikeState = (
  crewId: string,
  postId: string,
  serverLikeStatus?: boolean
) => {
  const [localLikeState, setLocalLikeState] = useState<{
    [postId: string]: boolean;
  }>({});

  const likeBulletinMutation = useLikeBulletin(crewId);
  const unlikeBulletinMutation = useUnlikeBulletin(crewId);

  // 에러 발생 시 로컬 상태 초기화
  useEffect(() => {
    if (likeBulletinMutation.isError && postId) {
      setLocalLikeState((prev) => ({ ...prev, [postId]: false }));
    }
    if (unlikeBulletinMutation.isError && postId) {
      setLocalLikeState((prev) => ({ ...prev, [postId]: true }));
    }
  }, [likeBulletinMutation.isError, unlikeBulletinMutation.isError, postId]);

  const handleLikeToggle = () => {
    if (!crewId || !postId) {
      console.error("크루 ID 또는 게시글 ID가 없습니다.");
      return;
    }

    const currentLikeStatus = localLikeState[postId] ?? serverLikeStatus;

    console.log(
      "🔄 [BULLETIN LIKE ACTION] 로컬상태:",
      localLikeState[postId],
      "서버상태:",
      serverLikeStatus,
      "최종상태:",
      currentLikeStatus,
      "API:",
      currentLikeStatus ? "DELETE" : "POST"
    );

    if (currentLikeStatus === true) {
      setLocalLikeState((prev) => ({ ...prev, [postId]: false }));
      unlikeBulletinMutation.mutate(postId);
    } else {
      setLocalLikeState((prev) => ({ ...prev, [postId]: true }));
      likeBulletinMutation.mutate(postId);
    }
  };

  const currentLikeStatus = postId
    ? (localLikeState[postId] ?? serverLikeStatus ?? false)
    : false;

  return {
    handleLikeToggle,
    isLiked: currentLikeStatus,
  };
};
