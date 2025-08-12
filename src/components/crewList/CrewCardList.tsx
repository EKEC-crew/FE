import type { Crew } from "../../types/crewCreate/crew";
import CrewCard from "./CrewCard";

interface CrewCardListProps {
  crews: Crew[];
}

const CrewCardList = ({ crews }: CrewCardListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {crews.map((crew) => (
        <CrewCard key={crew.id} {...crew} />
      ))}
    </div>
  );
};

export default CrewCardList;
