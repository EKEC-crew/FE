import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateScheduleApi } from "../../apis/schedule";
import type {
  RequestUpdateSchedule,
  ResponseUpdateSchedule,
} from "../../types/detail/schedule/types";

interface UpdateScheduleParams {
  crewId: string;
  planId: string;
  scheduleData: RequestUpdateSchedule;
}

export const useUpdateSchedule = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ResponseUpdateSchedule, Error, UpdateScheduleParams>({
    mutationFn: ({ crewId, planId, scheduleData }) =>
      updateScheduleApi(crewId, planId, scheduleData),
    onSuccess: (response, { crewId, planId }) => {
      console.log("일정 수정 성공:", response);

      if (response.resultType === "SUCCESS") {
        // 일정 목록 및 세부 정보 캐시 무효화 (새로고침)
        queryClient.invalidateQueries({
          queryKey: ["scheduleList", crewId],
        });
        queryClient.invalidateQueries({
          queryKey: ["scheduleDetail", crewId, planId],
        });

        alert("일정이 성공적으로 수정되었습니다!");
        // 일정 세부 페이지로 돌아가기
        navigate(-1);
      } else {
        console.error("일정 수정 실패:", response.error);
        alert(response.error?.reason || "일정 수정에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("일정 수정 오류:", error);
      alert("일정 수정 중 오류가 발생했습니다.");
    },
  });
};
