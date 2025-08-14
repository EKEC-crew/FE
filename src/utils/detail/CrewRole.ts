import type {
  CrewMember,
  CrewRole,
  RoleText,
} from "../../types/detail/crewMember";

export const getRoleText = (role?: CrewRole): RoleText => {
  const roles: RoleText[] = ["크루원", "운영진", "크루장"];
  if (role === undefined || role < 0 || role > 2) return "크루원";
  return roles[role];
};

// 역할 순으로 정렬 (크루장 > 운영진 > 크루원)
export const sortByRole = (members: CrewMember[]) => {
  return [...members].sort((a, b) => b.role - a.role);
};
