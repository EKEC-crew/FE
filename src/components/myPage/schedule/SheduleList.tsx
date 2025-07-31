import ScheduleItem from "./SheduleItem";

export const schedules = [
  {
    dayLabel: "Today",
    title: "사이클링히트",
    description: "사이클링히트_ 잠실 2030 여성 야구 직관 동호회 (두산 vs 삼성)",
  },
  {
    dayLabel: "DAY-1",
    title: "한강러너스",
    description: "한강러너스_ 여의도 선셋 러닝 5km (자유 참가)",
  },
  {
    dayLabel: "DAY-2",
    title: "오픈워터스윔",
    description: "오픈워터스윔_ 잠실 한강 수영 훈련 (초급반)",
  },
  {
    dayLabel: "DAY-3",
    title: "사이클링히트",
    description: "사이클링히트_ 반포 밤 라이딩 모임 (20km)",
  },
  {
    dayLabel: "DAY-4",
    title: "피크닉요가",
    description: "피크닉요가_ 반포한강 피크닉 요가 클래스 (매트 제공)",
  },
  {
    dayLabel: "DAY-5",
    title: "클라이밍모임",
    description: "클라이밍모임_ 성수 실내 클라이밍 체험 (장비 대여 가능)",
  },
];

function ScheduleList() {
  return (
    <div className="flex flex-col gap-y-3">
      {schedules.map((s, idx) => (
        <ScheduleItem
          key={idx}
          dayLabel={s.dayLabel}
          title={s.title}
          description={s.description}
        />
      ))}
    </div>
  );
}

export default ScheduleList;
