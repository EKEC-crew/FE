import { fetchAllUpcomingPlans } from "../../apis/upcomming";
import { useState, useEffect } from "react";

interface ScheduleData {
  id: number; // 고유 ID 추가
  dayLabel: string;
  title: string;
  description: string;
  date: string;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export const useUpcomingSchedules = () => {
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const plans = await fetchAllUpcomingPlans();

      // 🔥 중복 제거: id로 유니크한 일정만 남기기
      const uniquePlans = plans.filter(
        (plan, index, self) => index === self.findIndex((p) => p.id === plan.id)
      );

      const mapped = uniquePlans.map((plan) => ({
        id: plan.id, // 고유 ID 포함
        dayLabel: `D-${plan.daysUntil}`,
        title: plan.title,
        description: plan.crew_name,
        date: formatDate(plan.day),
      }));

      setSchedules(mapped);
    } catch (err) {
      setError("일정을 불러오는데 실패했습니다.");
      console.error("Failed to fetch schedules:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    refetch: loadSchedules,
  };
};
