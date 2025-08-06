import CrewMemberList from "../../../components/detail/memberList/CrewMemberList";
import Header from "../../../components/detail/header";
import Tabs from "../../../components/detail/tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CrewMemberListPage = () => {
  const { crewId } = useParams(); // url에서 크루id 받고
  const parsedCrewId = Number(crewId); // number 타입으로 변환해주기

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toggleId, setToggleId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setToggleId((prev) => (prev === id ? null : id));
  };

  if (isNaN(parsedCrewId)) return <div>잘못된 크루 ID입니다.</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12">
        <Header />
        <Tabs />
      </div>

      <main className="w-[1322px] mx-auto space-y-6 py-6">
        <CrewMemberList
          crewId={parsedCrewId}
          currentUserRole="크루장" // 아직 로그인 안되서 !
          selectedId={selectedId}
          onSelect={setSelectedId}
          toggleId={toggleId}
          onToggleClick={handleToggle}
        />
      </main>

      <div className="hidden xl:block w-[150px]" />
    </div>
  );
};

export default CrewMemberListPage;
