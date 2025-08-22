import { useUpcomingSchedules } from "../../../hooks/upcomming/useUpcoming";
import ScheduleItem from "./SheduleItem";

function UpcomingSchedules() {
  const { schedules, loading, error, refetch } = useUpcomingSchedules();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        다가오는 일정이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {schedules.map((schedule) => (
        <ScheduleItem
          key={schedule.id} // 배열 인덱스 대신 고유 ID 사용
          dayLabel={schedule.dayLabel}
          title={schedule.title}
          description={schedule.description}
          date={schedule.date}
        />
      ))}
    </div>
  );
}

export default UpcomingSchedules;
