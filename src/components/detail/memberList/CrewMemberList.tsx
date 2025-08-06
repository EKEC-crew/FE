import { useCrewMembers } from "../../../hooks/useCrewMember/useCrewMember";
import { useCrewRole } from "../../../hooks/useCrewMember/useCrewRole";
import { sortByRole, getRole } from "../../../utils/detail/CrewRole";
import MemberCard from "./MemberCard";

interface Props {
  crewId: number;
  currentUserRole: "크루장" | "운영진" | "크루원";
  selectedId: number | null;
  onSelect: (id: number) => void;
  toggleId: number | null;
  onToggleClick: (id: number) => void;
}

const CrewMemberList = ({
  crewId,
  currentUserRole,
  selectedId,
  onSelect,
  toggleId,
  onToggleClick,
}: Props) => {
  const { data, isLoading, error } = useCrewMembers(crewId);
  const { mutate } = useCrewRole(crewId); // ✅ 운영진 승격/제외 훅 사용

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>불러오기 실패</div>;
  if (!data) return <div>멤버 없음</div>;

  const sortedMembers = sortByRole(data);

  return (
    <div className="flex flex-col gap-[0.75rem]">
      {sortedMembers.map((member) => (
        <MemberCard
          key={member.memberId}
          id={member.memberId}
          name={member.nickname}
          role={getRole(member.role)}
          currentUserRole={currentUserRole}
          isSelected={selectedId === member.memberId}
          onClick={onSelect}
          onToggleClick={onToggleClick}
          openToggleId={toggleId}
          canManage={currentUserRole !== "크루원"}
          onPromoteOrDemote={() =>
            mutate({ memberId: member.memberId, currentRole: member.role })
          } // ✅ 클릭 시 실행
        />
      ))}
    </div>
  );
};

export default CrewMemberList;
