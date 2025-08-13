import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "../../apis/schedule";
import type { RequestCreateComment } from "../../types/detail/schedule/types";

export const useCreateComment = (crewId: string, planId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestCreateComment) =>
      createCommentApi(crewId, planId, data),
    onMutate: async (newComment) => {
      // 낙관적 업데이트를 위한 이전 데이터 백업
      await queryClient.cancelQueries({
        queryKey: ["scheduleDetail", Number(crewId), Number(planId)],
      });

      const previousData = queryClient.getQueryData([
        "scheduleDetail",
        Number(crewId),
        Number(planId),
      ]);

      // 낙관적 업데이트 - 댓글 목록에 임시 댓글 추가 (만약 댓글 목록이 있다면)
      queryClient.setQueryData(
        ["scheduleDetail", Number(crewId), Number(planId)],
        (old: any) => {
          if (!old) return old;

          // 임시 댓글 생성
          const tempComment = {
            id: Date.now(), // 임시 ID
            content: newComment.content,
            userId: 0, // 임시 사용자 ID
            writer: "작성 중...", // 실제로는 현재 사용자 정보를 사용해야 함
            writerImage: null,
            createdAt: new Date().toISOString(),
            isPublic: newComment.isPublic,
          };

          return {
            ...old,
            data: {
              ...old.data,
              comments: old.data.comments
                ? [...old.data.comments, tempComment]
                : [tempComment],
            },
          };
        }
      );

      return { previousData };
    },
    onSuccess: (response) => {
      console.log("댓글 작성 성공:", response);

      // 일정 상세 정보 재조회 (댓글 목록 포함)
      queryClient.invalidateQueries({
        queryKey: ["scheduleDetail", Number(crewId), Number(planId)],
      });
    },
    onError: (error, _variables, context) => {
      // 오류 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          ["scheduleDetail", Number(crewId), Number(planId)],
          context.previousData
        );
      }
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    },
    onSettled: () => {
      // 성공/실패와 관계없이 쿼리 다시 가져오기
      queryClient.invalidateQueries({
        queryKey: ["scheduleDetail", Number(crewId), Number(planId)],
      });
    },
  });
};
