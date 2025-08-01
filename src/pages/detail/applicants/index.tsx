import ApplicantsList from "../../../components/detail/applicants/ApplicantsList";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";

const ApplicantsListPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 상단 여백 */}
      <div className="mt-[3rem]">
        <Header />
        <Tabs />
      </div>
      {/* 본문 콘텐츠 */}
      <main className="w-[82.625rem] mx-auto space-y-[1.5rem] py-[1.5rem]">
        <ApplicantsList />
      </main>

      {/* 우측 여백 */}
      <div className="hidden xl:block w-[9.375rem]" />
    </div>
  );
};

export default ApplicantsListPage;
