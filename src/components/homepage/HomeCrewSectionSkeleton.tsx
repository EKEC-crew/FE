import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CrewCardSkeleton from "./CrewCardSkeleton";

export default function HomeCrewSectionSkeleton() {
  return (
    <section>
      <div className="w-full max-w-[940px] mx-auto mt-12">
        {/* 탭 자리 */}
        <div className="flex justify-center mb-6 gap-8">
          <Skeleton width={329} height={55} borderRadius={9999} />
          <Skeleton width={329} height={55} borderRadius={9999} />
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {[...Array(6)].map((_, idx) => (
            <CrewCardSkeleton key={idx} />
          ))}
        </div>
      </div>

      {/* 더보기 버튼 자리 */}
      <Skeleton
        width="100%"
        height={48}
        className="block w-full text-center mt-8 rounded-xl"
      />
    </section>
  );
}
