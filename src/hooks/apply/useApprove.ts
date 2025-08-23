import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crewApplyAPI } from ".././../apis/crewApply";
import type { ApprovalRequest, ApprovalResponse } from ".././../apis/crewApply";

interface UseApprovalMutationProps {
  onSuccess?: (data: ApprovalResponse) => void;
  onError?: (error: Error) => void;
}

export const useApprovalMutation = ({
  onSuccess,
  onError,
}: UseApprovalMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crewId,
      applyId,
      data,
    }: {
      crewId: number;
      applyId: number;
      data: ApprovalRequest;
    }) => crewApplyAPI.updateApplyStatus(crewId, applyId, data),

    onSuccess: (data) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({ queryKey: ["applicants-all"] }); // 신청자 목록
      queryClient.invalidateQueries({ queryKey: ["applyDetail"] }); // 신청 상세

      onSuccess?.(data);
    },

    onError: (error: any) => {
      console.error("승인/거부 처리 중 에러:", error);

      // 서버 에러 메시지 추출
      const serverMessage = error.response?.data?.error?.reason;
      const errorMessage =
        serverMessage || error.message || "처리 중 오류가 발생했습니다.";

      onError?.(new Error(errorMessage));
    },
  });
};

// 승인 전용 훅
export const useApproveMutation = (props: UseApprovalMutationProps = {}) => {
  const mutation = useApprovalMutation(props);

  const approve = (crewId: number, applyId: number) => {
    mutation.mutate({
      crewId,
      applyId,
      data: { status: 1 },
    });
  };

  return {
    approve,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

// 거부 전용 훅
export const useRejectMutation = (props: UseApprovalMutationProps = {}) => {
  const mutation = useApprovalMutation(props);

  const reject = (crewId: number, applyId: number) => {
    mutation.mutate({
      crewId,
      applyId,
      data: { status: 2 },
    });
  };

  return {
    reject,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
