// 역할 타입 (API랑 매핑 가능)
export type RoleType = "크루장" | "운영진" | "일반멤버";

// MemberCard에서 사용할 props 타입
export interface MemberCardProps {
  id: number;
  name: string;
  role?: RoleType;
  isSelected: boolean;
  onClick: (id: number) => void;
  canManage?: boolean;
  currentUserRole: RoleType;
  onToggleClick: (id: number) => void; // 추가
  openToggleId: number | null; // 추가 (현재 열려 있는 토글 id)
}
