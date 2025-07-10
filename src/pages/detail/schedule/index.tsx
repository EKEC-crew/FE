import Header from "../../../components/detail/header";
import Notice from "../../../components/detail/notice";
import Tabs from "../../../components/detail/tabs";
import Calendar from "../../../components/CrewSchedule/calendar";
import ScheduleList from "../../../components/CrewSchedule/ScheduleList";
import Pagination from "../../../components/CrewSchedule/button/pagination";
import Post from "../../../components/CrewSchedule/button/post";
function Schedule() {
  return (
<div className = "bg-gray-100">
      <div className="py-6 space-y-6 pt-12"> 
      <div>
      <Header />
      <Tabs />
      </div>
      <div className="px-6 py-6 space-y-3 pt-0"> 
      <Notice />
      <div className="mt-4 shadow-md overflow-hidden bg-white rounded-lg p-6 flex flex-col items-center">
              <Calendar />
              <div className="mt-6">
                <ScheduleList />
              </div>
              <Pagination />
              <div className="mt-4">
                <Post />
              </div>
            </div>
      </div>
    </div>
    </div>
  );
}
export default Schedule;

{/* <div className="mt-4 shadow-md overflow-hidden bg-white rounded-lg p-6 flex flex-col items-center">
              <Calendar />
              <div className="mt-6">
                <ScheduleList />
              </div>
              <Pagination />
              <div className="mt-4">
                <Post />
              </div>
            </div> */}