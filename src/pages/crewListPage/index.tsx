import CrewCardList from "../../components/crewList/CrewCardList";
import CrewFilterBar from "../../components/crewList/CrewFilterBar";
import CrewSortBar from "../../components/crewList/CrewSortBar";
import Pagination from "../../components/crewList/Pagination";

const CrewListPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[150px] pt-30 pb-20">
        {/* 헤더 */}
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">
          맞춤 크루를 찾아보세요!
        </h2>

        {/* 필터 옵션 */}
        <CrewFilterBar />

        {/* 크루 개수 + 정렬 옵션 */}
        <CrewSortBar />

        {/* 카드 리스트 */}
        <CrewCardList />

        {/* 페이지네이션 */}
        <div className="mt-12 flex justify-center">
          <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CrewListPage;
