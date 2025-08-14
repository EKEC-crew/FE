// src/pages/myPage/AppliedCrewPage.tsx
import { useMyAppliedCrewList } from "../../hooks/apply/useMyAppliedCrewList";
import AppliedCrewList from "../../components/myPage/applied/AppliedCrewList";
import type { AppliedCrew } from "../../types/mypage/AppliedCrew";
import { useMemo } from "react";
import type { AppliedItem } from "@/types/apply/types";

const AppliedCrewPage = () => {
  const { data, isLoading, isError, error, refetch } = useMyAppliedCrewList({
    page: 1,
    size: 24,
  });

  // 서버 응답 → UI에서 쓰는 AppliedCrew로 변환
  const appliedCrews: AppliedCrew[] = useMemo(() => {
    // data가 AppliedListSuccess 타입이므로 직접 items에 접근
    const items = data?.items ?? [];
    return items.map<AppliedCrew>((item: AppliedItem) => ({
      id: item.applyId,
      name: item.crewName,
      description: item.crewContent ?? "",
      imageUrl: item.crewImage ?? "",
      status: item.statusLabel as AppliedCrew["status"], // 타입 단언
      crewId: item.crewId,
      applyId: item.applyId,
      appliedAt: item.appliedAt,
    }));
  }, [data]);

  // 로딩 상태
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
        <button
          className="px-3 py-2 rounded bg-gray-900 text-white"
          onClick={() => refetch()}
        >
          다시 시도
        </button>
        <div className="text-sm text-gray-500 mt-2">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (appliedCrews.length === 0) {
    return (
      <div className="px-10 py-6">
        <div className="text-[2.25rem] font-semibold mb-5">
          내가 지원한 크루
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 text-6xl mb-4"></div>
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
      <AppliedCrewList crews={appliedCrews} />
    </div>
  );
};

export default AppliedCrewPage;
