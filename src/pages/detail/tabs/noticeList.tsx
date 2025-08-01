import NoticeListComponent from "../../../components/detail/notice/NoticeList";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";
function NoticeList() {
  return (
    <>
    <div className = "mt-12">
    <Header />
    <Tabs />
    </div>
    <div className="bg-gray-100">
    <NoticeListComponent />
    </div>
    </>
  );
}

export default NoticeList;
