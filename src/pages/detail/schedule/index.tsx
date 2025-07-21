import Header from "../../../components/detail/header";
import Notice from "../../../components/detail/notice";
import Tabs from "../../../components/detail/tabs";
import Calendar from "../../../components/detail/Schedule/calendar";
import ScheduleList from "../../../components/detail/Schedule/ScheduleList";
import Pagination from "../../../components/detail/Schedule/button/pagination";
import Post from "../../../components/detail/Schedule/button/post";

function Schedule() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12">
        <Header />
        <Tabs />
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 pt-6 space-y-6">
        <Notice />

        <div className="shadow-md overflow-hidden bg-white rounded-lg p-6 flex flex-col items-center">
          <Calendar />

          <div className="mt-6 w-full">
            <ScheduleList />
          </div>

          <div className="mt-4 w-full">
            <Pagination />
          </div>

          <div className="mt-4">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
