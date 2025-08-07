import CrewMemberList from "../../../components/detail/memberList/CrewMemberList";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCrewRole } from "../../../hooks/CrewMemberList/useCrewRole"; // 슬래시 2개 수정!

const CrewMemberListPage = () => {
  const { crewId } = useParams();
  const parsedCrewId = Number(crewId);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toggleId, setToggleId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggle = (id: number) => {
    setToggleId((prev) => (prev === id ? null : id));
  };

  const { mutate } = useCrewRole(parsedCrewId);

  if (isNaN(parsedCrewId)) return <div>잘못된 크루 ID입니다.</div>;

  //  페이지 수 계산은 CrewMemberList 내부에서 처리 중
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12">
        <Header />
        <Tabs />
      </div>

      <main className="w-[1322px] mx-auto space-y-6 py-6">
        <CrewMemberList
          crewId={parsedCrewId}
          selection={{
            selectedId,
            toggleId,
            onSelect: setSelectedId,
            onToggle: handleToggle,
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPromoteOrDemote={(memberId, currentRole) =>
            mutate({ memberId, currentRole })
          }
        />
      </main>

      <div className="hidden xl:block w-[150px]" />
    </div>
  );
};

export default CrewMemberListPage;
