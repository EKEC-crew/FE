import ScheduleItem from "./ScheduleItem";

const ScheduleList = () => {
  const schedules = [
    {
      type: "정기" as const, //리터럴 타입으로 고정
      label: "공지",
      title: "잠실 2030 여성 야구 직관 동호회",
      date: "2025.06.18",
      status: "신청하기",
      isNew: true,
    },
    {
      type: "정기" as const,
      title: "잠실 2030 여성 야구 직관 동호회",
      date: "2025.06.18",
      status: "신청 완료",
    },
    {
      type: "번개" as const,
      title: "잠실 2030 여성 야구 직관 동호회",
      date: "2025.06.18",
      status: "신청 하기",
    },
  ];

  return (
    <div className="mt-6">
      {schedules.map((s, idx) => (
        <ScheduleItem key={idx} {...s} />
      ))}
    </div>

  );
};

export default ScheduleList;
