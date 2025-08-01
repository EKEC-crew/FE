import CrewMemberList from "../../../components/detail/memberList/CrewMemberList";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";

const CrewMemberListPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 상단 여백 */}
      <div className="mt-12">
        <Header />
        <Tabs />
      </div>
      {/* 본문 콘텐츠 */}
      <main className="w-[1322px] mx-auto space-y-6 py-6">
        <CrewMemberList />
      </main>

      {/* 우측 여백 */}
      <div className="hidden xl:block w-[150px]" />
    </div>
  );
};

export default CrewMemberListPage;
