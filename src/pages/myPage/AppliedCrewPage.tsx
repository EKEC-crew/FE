// src/pages/myPage/AppliedCrewPage.tsx
import { useMyAppliedCrewList } from "../../hooks/apply/useMyAppliedCrewList";
import AppliedCrewList from "../../components/myPage/applied/AppliedCrewList";
import noIcon from "../../assets/icons/img_graphic3_340.svg";
const AppliedCrewPage = () => {
  const {
    crews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useMyAppliedCrewList(); // ✅ 파라미터 제거

  // 로딩 상태 (첫 로딩)
  if (isLoading) {
    return (
      <div className="px-10 py-6">
        <div className="text-[2.25rem] font-semibold mb-5">
          내가 지원한 크루
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-lg border bg-white p-4 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className="px-10 py-6">
        <div className="text-[2.25rem] font-semibold mb-5">
          내가 지원한 크루
        </div>
        <div className="text-red-600 font-medium mb-3">
          지원 내역을 불러오지 못했어요.
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (crews.length === 0) {
    return (
      <div className="px-10 py-6">
        <div className="text-[2.25rem] font-semibold mb-5">
          내가 지원한 크루
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img src={noIcon} className="h-[21.25rem] w-[21.25rem] mb-4" />
          <div className="text-lg font-medium text-gray-600 mb-2">
            아직 지원한 크루가 없어요
          </div>
          <div className="text-sm text-gray-500">
            관심있는 크루에 지원해보세요!
          </div>
        </div>
      </div>
    );
  }

  // 정상 상태
  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-5">내가 지원한 크루</div>
      <AppliedCrewList
        crews={crews}
        hasMore={hasNextPage ?? false}
        fetchMore={fetchNextPage}
        isLoading={isFetchingNextPage}
      />
    </div>
  );
};

export default AppliedCrewPage;
