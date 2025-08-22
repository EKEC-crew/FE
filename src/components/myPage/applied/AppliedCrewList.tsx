// components/myPage/applied/AppliedCrewList.tsx
import InfiniteScroll from "react-infinite-scroll-component";
import CrewCard from "../../myPage/CrewCard";
import type { AppliedCrew } from "../../../types/mypage/AppliedCrew";
import noIcon from "../../../assets/icons/img_graphic3_340.svg";

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
      <div className=" flex flex-col justify-center items-center">
        <img src={noIcon} className="h-[340px] w-[340px]" />
        <div className="text-center py-8 text-gray-500">
          회원님이 지원한 크루가 없어요 <br />꼭 맞는 크루를 찾아보세요!
        </div>
        <div className="text-center py-8 text-gray-500"></div>
      </div>
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
            key={crew.applyId}
            crewId={crew.crewId}
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
