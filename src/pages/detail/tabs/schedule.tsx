import Header from "../../../components/detail/header";
import Notice from "../../../components/detail/notice";
import Tabs from "../../../components/detail/tabs";
import AboutSection from "../../../components/detail/about";
import Calendar from "../../../components/CrewSchedule/calendar";
import ScheduleList from "../../../components/CrewSchedule/ScheduleList";
import Pagination from "../../../components/CrewSchedule/button/Pagination";
import Post from "../../../components/CrewSchedule/button/post";
function Detail() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="shadow-md overflow-hidden">
          <Header />
          <Tabs />
          <div className="mt-4">
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
    </div>
  );
}

export default Detail;
