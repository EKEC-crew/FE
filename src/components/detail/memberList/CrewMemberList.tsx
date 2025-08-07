import { useCrewMembers } from "../../../hooks/CrewMemberList/useCrewMember";
import type {
  CrewMemberListProps,
  CrewRole,
} from "../../../types/detail/crewMember";
import { sortByRole, getRoleText } from "../../../utils/detail/CrewRole";
import Pagination from "../bulletin/button/pagination";

import MemberCard from "./MemberCard";

import { useNavigate } from "react-router-dom";

export default function CrewMemberList({
  crewId,
  selection,
  onPromoteOrDemote,
  currentPage,
  onPageChange,
}: CrewMemberListProps) {
  const { data, isLoading, error } = useCrewMembers(crewId);
  const navigate = useNavigate();

  if (isLoading) return <div>불러오는 중...</div>;
  if (error || !data) return <div>불러오기 실패</div>;

  const { members, userRole } = data;
  const sortedMembers = sortByRole(members);
  // 현재 페이지에 따라 1페이지당 24명씩 보여줌
  const itemsPerPage = 24;
  const paginatedMembers = sortedMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  return (
    <div className="p-[1.5rem] px-[3rem] py-[2.5rem] bg-white rounded-xl shadow w-[82.625rem] mx-auto">
      {/* 타이틀 */}
      <div className="flex justify-between">
        <div className="text-[2.25rem] font-semibold mb-[0.5rem]">
          크루원 목록
        </div>
        {getRoleText(userRole) === "크루장" && (
          <button
            onClick={() => navigate(`/crew/${crewId}/applicants`)}
            className="w-[11.0625rem] h-[3.4375rem] rounded-[0.75rem] text-[1.625rem] bg-[#3A3ADB] text-white"
          >
            지원확인
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-[1rem]">전체 {members.length}명</p>

      {/* 멤버 카드 */}
      <div className="grid grid-cols-3 gap-[1.5rem] mb-[1.5rem]">
        {paginatedMembers.map((member) => (
          <MemberCard
            key={member.memberId}
            id={member.memberId}
            memberId={member.memberId}
            crewId={crewId}
            name={member.nickname ?? "이름 없음"}
            role={getRoleText(member.role as CrewRole)}
            currentUserRole={getRoleText(userRole)}
            isSelected={selection.selectedId === member.memberId}
            openToggleId={selection.toggleId}
            onClick={selection.onSelect}
            onToggleClick={selection.onToggle}
            canManage={userRole !== 0}
            onPromoteOrDemote={() =>
              onPromoteOrDemote(member.memberId, member.role)
            }
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
