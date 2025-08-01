import { useState } from "react";
import CrewCard from "./CrewCard";
import CrewSelector from "./CrewSelector";
import { useNavigate } from "react-router-dom";
import { dummyPopularCrews, dummyNewCrews } from "./crewDummy";
import HomeCrewSectionSkeleton from "./HomeCrewSectionSkeleton";

export default function HomeCrewSection() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"popular" | "new">("popular");

  // 여긴 더미 데이터지만 실제로는 fetch 상태에 따라 분기
  const isLoading = true;

  const crewList =
    selectedTab === "popular" ? dummyPopularCrews : dummyNewCrews;

  if (isLoading) return <HomeCrewSectionSkeleton />;

  return (
    <section>
      <div className="w-full max-w-[940px] mx-auto mt-12">
        <div className="flex justify-center mb-6">
          <CrewSelector selected={selectedTab} onChange={setSelectedTab} />
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {crewList.slice(0, 20).map((crew) => (
            <CrewCard key={crew.id} crew={crew} />
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          navigate(
            `/crew-list?sort=${selectedTab === "popular" ? "popular" : "new"}`
          )
        }
        className="block w-full text-center mt-8 py-3 rounded-xl bg-[#F1F1F5] text-[#555] font-semibold"
      >
        {selectedTab === "popular" ? "인기크루 더보기" : "신규크루 더보기"}
      </button>
    </section>
  );
}
