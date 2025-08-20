// components/myPage/applied/AppliedCrewList.tsx
import InfiniteScroll from "react-infinite-scroll-component";
import CrewCard from "../../myPage/CrewCard";
import type { AppliedCrew } from "../../../types/mypage/AppliedCrew";

interface Props {
  crews: AppliedCrew[];
  hasMore: boolean;
  fetchMore: () => void;
  isLoading: boolean;
}

export default function AppliedCrewList({
  crews,
  hasMore,
  fetchMore,
  isLoading,
}: Props) {
  if (crews.length === 0 && !isLoading) {
    return (
      <p className="text-center text-gray-400 mt-12">
        아직 지원한 크루가 없습니다.
      </p>
    );
  }

  return (
    <InfiniteScroll
      dataLength={crews.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <p className="text-center text-gray-400 py-4">더 불러오는 중...</p>
      }
      endMessage={
        <p className="text-center text-gray-400 py-4">
          모든 지원 내역을 확인했습니다!
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        {crews.map((crew) => (
          <CrewCard
            key={crew.id}
            crewId={crew.id}
            imageUrl={crew.imageUrl}
            category="" // 카테고리 없으면 빈 문자열
            title={crew.name}
            description={crew.description}
            rightContent={
              <span
                className={`w-[10.9rem] h-[3.4rem] flex items-center justify-center rounded-xl font-[1.625rem]
                  ${crew.status === "미승인" ? "bg-[#D9DADD] text-[#5E6068]" : "bg-[#3A3ADB] text-white"}`}
              >
                {crew.status}
              </span>
            }
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
