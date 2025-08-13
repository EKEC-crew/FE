import type { CrewInfoRequest } from "../../types/crewCreate/crew";
import { getRegionId } from "../regions";

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
  recruitMessage: string;
}

export const toServerCrewInfo = (p: CrewInfoMapperParams): CrewInfoRequest => {
  const regionId = getRegionId(p.filters.regionSido, p.filters.regionGu);

  const base: Omit<CrewInfoRequest, "region"> = {
    name: p.crewName,
    recruitMessage: (p.recruitMessage ?? "").trim(),
    description: p.crewDescription,
    maxCapacity: p.isHeadcountUnlimited ? 0 : (p.headcount ?? 0),
    category: p.category ?? 0,
    age: p.age ?? 0,
    gender: p.isGenderUnlimited ? 0 : (p.selectedGender ?? 0),
    activities: p.activities,
    styles: p.styles,
  };

  // 미선택시 region 생략
  return regionId != null ? { ...base, region: regionId } : base;
};
