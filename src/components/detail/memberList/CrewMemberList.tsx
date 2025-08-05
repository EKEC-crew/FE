import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import type { RoleType } from "../../../types/detail/crewMember";
import Pagination from "../../crewList/Pagination";
import { useNavigate, useParams } from "react-router-dom";

// members 더미 데이터
const members: { id: number; name: string; role?: RoleType }[] = [
  { id: 1, name: "짱아", role: "크루장" },
  { id: 2, name: "방방", role: "운영진" },
  { id: 3, name: "바나", role: "운영진" },
  { id: 4, name: "우주최고동열", role: "운영진" },
  { id: 5, name: "강백호짱짱", role: "운영진" },
  { id: 6, name: "최고의운영자", role: "운영진" },
  { id: 7, name: "캡틴아메리카", role: "운영진" },
  { id: 8, name: "아이언맨토니", role: "운영진" },
  { id: 9, name: "손오공초사이언", role: "운영진" },
  { id: 10, name: "루피해적왕", role: "운영진" },
  { id: 11, name: "크루원서포터", role: "운영진" },
  { id: 12, name: "웬디" },
  { id: 13, name: "현" },
  { id: 14, name: "이상한나라앨리스" },
  { id: 15, name: "도라에몽짱" },
  { id: 16, name: "헐크스매쉬" },
  { id: 17, name: "정대만" },
  { id: 18, name: "사쿠라짱짱짱" },
  { id: 19, name: "베지터" },
  { id: 20, name: "조로삼천세계" },
  { id: 21, name: "나루토우즈마키" },
  { id: 22, name: "사스케치도리" },
  { id: 23, name: "키리토소드마스터" },
  { id: 24, name: "아스나플래시" },
  { id: 25, name: "진격거인초대형" },
  { id: 26, name: "에렌예거" },
  { id: 27, name: "리바이병장" },
  { id: 28, name: "알렌워커" },
  { id: 29, name: "신짱구만세" },
  { id: 30, name: "봉미선짱짱짱짱" },
];

export default function CrewMemberList() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openToggleId, setOpenToggleId] = useState<number | null>(null);
  const [currentUserRole] = useState<RoleType>("크루장");

  const { crewId } = useParams();

  // 페이지네이션 상태
  const pageSize = 24; // 3 x 8 = 24명씩 보여주기
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(members.length / pageSize);

  // 현재 페이지 멤버 slice
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMembers = members.slice(startIndex, startIndex + pageSize);

  // 토글 열림/닫기
  const handleToggleClick = (id: number) => {
    setOpenToggleId((prev) => (prev === id ? null : id));
  };

  // 바깥 클릭 시 토글 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openToggleId === null) return;
      const target = e.target as HTMLElement;
      if (!target.closest(".toggle-container")) {
        setOpenToggleId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openToggleId]);

  return (
    <div className="p-[1.5rem] px-[3rem] py-[2.5rem] bg-white rounded-xl shadow w-[82.625rem] mx-auto">
      {/* 타이틀 */}
      <div className="flex justify-between">
        <div className="text-[2.25rem] font-semibold mb-[0.5rem]">
          크루원 목록
        </div>
        {currentUserRole === "크루장" && (
          <button
            onClick={() => navigate(`/crew/${crewId}/applicants`)} // 지원자 목록 페이지로 이동
            className="w-[11.0625rem] h-[3.4375rem] rounded-[0.75rem] text-[1.625rem] bg-[#3A3ADB] text-white"
          >
            지원확인
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-[1rem]">전체 {members.length}명</p>

      {/* 멤버 카드 */}
      <div className="grid grid-cols-3 gap-[1.5rem] mb-[1.5rem]">
        {paginatedMembers.map((m) => (
          <MemberCard
            key={m.id}
            id={m.id}
            name={m.name}
            role={m.role}
            isSelected={selectedId === m.id}
            onClick={setSelectedId}
            currentUserRole={currentUserRole}
            canManage={
              currentUserRole === "크루장" || currentUserRole === "운영진"
            }
            openToggleId={openToggleId}
            onToggleClick={handleToggleClick}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
