import type {
  CrewMember,
  CrewRole,
  RoleText,
} from "../../types/detail/crewMember";

// 숫자 역할을 텍스트로 변환
export const getRoleText = (role: CrewRole): RoleText => {
  return ["크루원", "운영진", "크루장"][role] as RoleText;
};

// 역할 순으로 정렬 (크루장 > 운영진 > 크루원)
export const sortByRole = (members: CrewMember[]) => {
  return [...members].sort((a, b) => b.role - a.role);
};
