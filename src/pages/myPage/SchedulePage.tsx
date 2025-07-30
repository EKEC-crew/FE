import ScheduleList from "../../components/myPage/schedule/SheduleList";

const SchedulePage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <h2 className="text-[2.25rem] mb-2">다가오는 일정</h2>
      <ScheduleList />
    </div>
  );
};

export default SchedulePage;
