import type { CrewMember } from "../../types/detail/crewMember";

export const getRole = (role: 0 | 1 | 2): "크루장" | "운영진" | "크루원" => {
  switch (role) {
    case 2:
      return "크루장";
    case 1:
      return "운영진";
    case 0:
    default:
      return "크루원";
  }
};

export const sortByRole = (members: CrewMember[]): CrewMember[] => {
  return [...members].sort((a, b) => b.role - a.role); // 2 > 1 > 0
};
