import NoticeItems from "../../../components/detail/notice/NoticeItems";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";
function NoticeList() {
  return (
    <>
    <Header />
    <Tabs />
    <div className="bg-gray-100">
    <NoticeItems />
    </div>
    </>
  );
}

export default NoticeList;
