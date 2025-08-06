export type CrewRole = 0 | 1 | 2;

export interface CrewMember {
  memberId: number;
  nickname: string;
  role: 0 | 1 | 2;
}

export type RoleText = "크루원" | "운영진" | "크루장";

export interface MemberCardProps {
  id: number; // 멤버 ID (memberId)

  name: string; // 닉네임
  role: RoleText; // 역할 (크루원/운영진/크루장)
  currentUserRole: RoleText; // 로그인한 유저의 역할
  isSelected: boolean;
  onClick: (id: number) => void;
  onToggleClick: (id: number) => void;
  openToggleId: number | null;
  canManage?: boolean;
  onPromoteOrDemote?: () => void; // ✅ 승격/제외 핸들러
}
