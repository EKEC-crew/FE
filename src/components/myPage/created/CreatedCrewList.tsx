import CrewCard from "../CrewCard";
import type { CreatedCrew } from "../../../types/mypage/CreateCrew";

interface Props {
  crews: CreatedCrew[];
}

export default function CreatedCrewList({ crews }: Props) {
  if (crews.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-12">
        아직 만든 크루가 없습니다.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {crews.map((crew) => {
        const isFull = crew.current === crew.max;

        return (
          <CrewCard
            key={crew.id}
            imageUrl={crew.imageUrl}
            category={crew.category}
            title={crew.name}
            description={crew.description}
            rightContent={
              <span
                className={`
                  w-[7.5rem] h-[2.5rem]
                  flex items-center justify-center rounded-[1.25rem]
                  text-[1.25rem]
                  text-white
                  ${isFull ? "bg-[#5E6068]" : "bg-[#3A3ADB]"}
                `}
              >
                크루 {crew.current}/{crew.max}
              </span>
            }
          />
        );
      })}
    </div>
  );
}
