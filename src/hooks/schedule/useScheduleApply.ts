import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyScheduleApi } from "../../apis/schedule";

export const useScheduleApply = (crewId: string, scheduleId: string) => {
  const queryClient = useQueryClient();
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const applyMutation = useMutation({
    mutationFn: () => applyScheduleApi(crewId, scheduleId),
    onMutate: async () => {
      console.log("🚀 낙관적 업데이트 시작", { crewId, scheduleId });
      
      // 낙관적 업데이트를 위해 이전 데이터 백업
      await queryClient.cancelQueries({
        queryKey: ["schedule", crewId, scheduleId],
      });
      await queryClient.cancelQueries({
        queryKey: ["schedules", crewId],
      });

      const previousScheduleData = queryClient.getQueryData([
        "schedule",
        crewId,
        scheduleId,
      ]);

      const previousSchedulesData = queryClient.getQueryData([
        "schedules",
        crewId,
      ]);

      console.log("📋 이전 데이터", { previousScheduleData, previousSchedulesData });

      // 상세 페이지 낙관적 업데이트: 즉시 isApplied를 true로 변경
      queryClient.setQueryData(
        ["schedule", crewId, scheduleId],
        (old: any) => {
          if (!old) return old;
          const newData = {
            ...old,
            data: {
              ...old.data,
              isApplied: true,
            },
          };
          console.log("✅ 상세 페이지 업데이트", { old: old.data, new: newData.data });
          return newData;
        }
      );

      // 스케줄 리스트 낙관적 업데이트: 해당 일정의 isApplied를 true로 변경
      queryClient.setQueryData(
        ["schedules", crewId],
        (old: any) => {
          if (!old?.data?.plans) return old;
          const newData = {
            ...old,
            data: {
              ...old.data,
              plans: old.data.plans.map((plan: any) =>
                plan.id === parseInt(scheduleId)
                  ? { ...plan, isApplied: true }
                  : plan
              ),
            },
          };
          console.log("📝 리스트 업데이트", { 
            scheduleId: parseInt(scheduleId),
            oldPlans: old.data.plans.map((p: any) => ({ id: p.id, isApplied: p.isApplied })),
            newPlans: newData.data.plans.map((p: any) => ({ id: p.id, isApplied: p.isApplied }))
          });
          return newData;
        }
      );

      return { previousScheduleData, previousSchedulesData };
    },
    onSuccess: () => {
      console.log("🎉 신청 성공!");
      // 모달을 먼저 표시하고 버튼을 숨김
      setShowApplyButton(false);
      setShowCompleteModal(true);
      // setTimeout 제거 - 즉시 invalidation 하지 않음
      // 모달을 닫을 때 invalidation 수행
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousScheduleData) {
        queryClient.setQueryData(
          ["schedule", crewId, scheduleId],
          context.previousScheduleData
        );
      }
      if (context?.previousSchedulesData) {
        queryClient.setQueryData(
          ["schedules", crewId],
          context.previousSchedulesData
        );
      }
      console.error("일정 신청 실패:", error);
      alert("일정 신청에 실패했습니다. 다시 시도해주세요.");
    },
    onSettled: () => {
      // onSuccess에서 이미 invalidation을 했으므로 여기서는 에러 시에만 실행
      // 최종 안전망으로만 사용
    },
  });

  const handleApplyClick = (isApplied: boolean) => {
    if (isApplied) return;
    setShowApplyButton(true);
  };

  const handleConfirmApply = () => {
    if (!applyMutation.isPending) {
      applyMutation.mutate();
    }
  };

  const handleCancelApply = () => {
    setShowApplyButton(false);
  };

  const handleCloseModal = () => {
    console.log("❌ 모달 닫기 - 서버 데이터와 동기화 시작");
    setShowCompleteModal(false);
    // 모달을 닫을 때 서버 데이터로 최종 동기화
    queryClient.invalidateQueries({
      queryKey: ["schedule", crewId, scheduleId],
    });
    queryClient.invalidateQueries({
      queryKey: ["schedules", crewId],
    });
    console.log("🔄 쿼리 무효화 완료");
  };

  return {
    showApplyButton,
    showCompleteModal,
    applyMutation,
    handleApplyClick,
    handleConfirmApply,
    handleCancelApply,
    handleCloseModal,
  };
};
