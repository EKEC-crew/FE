import type { CrewInfo } from "../../types/crewCreate/crew";
import { regionIdMap } from "./regionMapper";

interface CrewInfoMapperParams {
  crewName: string;
  crewDescription: string;
  headcount: number | null;
  category: number | null;
  activities: number[];
  styles: number[];
  filters: {
    regionSido: string | null;
    regionGu: string | null;
  };
  age: number | null;
  selectedGender: number | null;
  isHeadcountUnlimited: boolean;
  isGenderUnlimited: boolean;
}

export const toServerCrewInfo = ({
  crewName,
  crewDescription,
  headcount,
  category,
  activities,
  styles,
  filters,
  age,
  selectedGender,
  isHeadcountUnlimited,
  isGenderUnlimited,
}: CrewInfoMapperParams): CrewInfo => {
  const regionLabel =
    filters.regionSido && filters.regionGu
      ? `${filters.regionSido} ${filters.regionGu}`
      : "";
  const regionId = regionIdMap[regionLabel] ?? 1;

  console.log("[regionLabel]", `"${regionLabel}"`);
  console.log("[regionId]", regionId);

  return {
    name: crewName,
    recruitMessage: "선택해주셔서 감사합니다!",
    description: crewDescription,
    maxCapacity: isHeadcountUnlimited ? 0 : (headcount ?? 0),
    category: category ?? 0,
    age: age ?? 0,
    gender: isGenderUnlimited ? 0 : (selectedGender ?? 0),
    region: regionId,
    activities,
    styles,
  };
};
