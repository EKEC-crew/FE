import Header from "../../../components/detail/header";
import Notice from "../../../components/detail/notice";
import Tabs from "../../../components/detail/tabs";
import Pagination from "../../../components/CrewSchedule/button/pagination";
import ReviewSummary from "../../../components/detail/review/ReviewSummary";
import ReviewList from "../../../components/detail/review/ReviewList";
import ReviewButton from "../../../components/detail/review/ReviewButton";
function ReviewPage() {
  return (
<div className = "bg-gray-100">
      <div className="py-6 space-y-6 pt-12"> 
      <div>
      <Header />
      <Tabs />
      </div>
      <div className="px-1 py-1 space-y-3 pt-0"> 
      <Notice />
      </div>
      <div className = "bg-white rounded-2xl mx-4 px-6 py-6">
      <p className = "text-left font-bold text-lg pt-5 mx-6">리뷰</p>
      <ReviewSummary/>
      <ReviewList />
      <Pagination />
      <ReviewButton />
      </div>
    </div>
    </div>
  );
}
export default ReviewPage;