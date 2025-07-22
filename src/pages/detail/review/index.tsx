import Header from "../../../components/detail/header";
import Notice from "../../../components/detail/notice";
import Tabs from "../../../components/detail/tabs";
import Pagination from "../../../components/detail/Schedule/button/pagination";
import ReviewSummary from "../../../components/detail/review/ReviewSummary";
import ReviewList from "../../../components/detail/review/ReviewList";
import ReviewButton from "../../../components/detail/review/ReviewButton";
function ReviewPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 상단 여백 */}
      <div className="mt-12">
      <Header />
      <Tabs />
      </div>
        {/* 본문 콘텐츠 */}
      <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 space-y-6 py-6">
        <Notice />

        <section className="bg-white rounded-2xl px-4 sm:px-6 py-6">
          <p className="text-left font-bold text-lg pt-5">리뷰</p>
          <ReviewSummary />
          <ReviewList />
          <Pagination />
          <ReviewButton />
        </section>
      </main>

        {/* 우측 여백 */}
        <div className="hidden xl:block w-[150px]" />
      </div>
  );
}
export default ReviewPage;
