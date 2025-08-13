import { useParams } from "react-router-dom";
import { useScheduleList } from "../../../hooks/schedule/useScheduleList";
import ScheduleItem from "./ScheduleItem";

interface ScheduleListProps {
  currentPage?: number;
  onPaginationChange?: (pagination: any) => void;
}

const ScheduleList = ({
  currentPage = 1,
  onPaginationChange,
}: ScheduleListProps) => {
  const { crewId } = useParams<{ crewId: string }>();
  const itemsPerPage = 10;

  const { data, isLoading, error } = useScheduleList(
    crewId || "",
    currentPage,
    itemsPerPage
  );

  const schedules = data?.data?.plans || [];
  const pagination = data?.data?.pagination;

  // pagination 정보를 부모에게 전달
  if (pagination && onPaginationChange) {
    onPaginationChange(pagination);
  }

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

  if (schedules.length === 0) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="text-gray-500">등록된 일정이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* 일정 목록 */}
      <div>
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
            likeCount={schedule.likeCount || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
