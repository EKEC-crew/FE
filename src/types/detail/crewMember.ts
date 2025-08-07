// 역할 숫자 정의 (서버 기준: 0 = 크루원, 1 = 운영진, 2 = 크루장)
export type CrewRole = 0 | 1 | 2;

// 역할 텍스트 타입
export type RoleText = "크루원" | "운영진" | "크루장";

// 서버에서 내려주는 멤버 데이터 구조
export interface CrewMember {
  memberId: number;
  nickname: string | null;
  role: number; // CrewRole로 좁힐 수도 있음
}

// 개별 멤버 카드에 전달될 props
export interface MemberCardProps {
  crewId: number; // 크루의 id
  id: number; // 그 계정의 고유 id
  memberId: number; //크루에 속한 멤버에게 주는 id
  name: string;
  role: RoleText;
  currentUserRole: RoleText;
  isSelected: boolean;
  onClick: (id: number) => void;
  onToggleClick: (id: number) => void;
  openToggleId: number | null;
  canManage?: boolean;
  onPromoteOrDemote?: (id: number, currentRole: number) => void;
}

//  멤버 리스트 전체를 구성하는 props
export interface CrewMemberListProps {
  crewId: number;
  selection: {
    selectedId: number | null;
    toggleId: number | null;
    onSelect: (id: number) => void;
    onToggle: (id: number) => void;
  };
  onPromoteOrDemote: (memberId: number, currentRole: number) => void;

  // 페이지네이션 관련 prop도 추가
  currentPage: number;
  onPageChange: (page: number) => void;
}
