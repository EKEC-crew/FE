import CrewCard from "../../myPage/CrewCard";
import type { AppliedCrew } from "../../../types/mypage/AppliedCrew";

interface Props {
  crews: AppliedCrew[];
}

export default function AppliedCrewList({ crews }: Props) {
  if (crews.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-12">
        아직 지원한 크루가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {crews.map((crew) => (
        <CrewCard
          key={crew.id}
          imageUrl={crew.imageUrl}
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
  );
}
