import { useParams } from "react-router-dom";
import { useScheduleList } from "../../../hooks/schedule/useScheduleList";
import ScheduleItem from "./ScheduleItem";

const ScheduleList = () => {
  const { crewId } = useParams<{ crewId: string }>();
  const { data, isLoading, error } = useScheduleList(crewId || "", 1, 10);

  console.log("[ScheduleList Debug]", {
    crewId,
    data,
    isLoading,
    error,
  });

  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="text-gray-500">일정을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !data || data.resultType === "FAIL") {
    return (
      <div className="mt-6 flex justify-center">
        <div className="text-red-500">일정을 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  const schedules = data.data?.plans || [];

  if (schedules.length === 0) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="text-gray-500">등록된 일정이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {schedules.map((schedule) => (
        <ScheduleItem
          key={schedule.id}
          id={schedule.id}
          type={schedule.type === 0 ? "정기" : "번개"}
          title={schedule.title}
          date={new Date(schedule.day)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, ".")
            .slice(0, -1)}
          status={schedule.isRequired ? "신청하기" : "참고용"}
          isNew={false}
        />
      ))}
    </div>
  );
};

export default ScheduleList;
