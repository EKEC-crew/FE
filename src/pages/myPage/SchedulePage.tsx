import ScheduleList from "../../components/myPage/schedule/SheduleList";

const SchedulePage = () => {
  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-5">다가오는 일정</div>
      <div className="flex flex-col gap-y-3">
        <ScheduleList />
      </div>
    </div>
  );
};

export default SchedulePage;
