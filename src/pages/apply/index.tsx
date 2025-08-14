// src/pages/apply/index.tsx
import Header from "../../components/apply/Header";
import Info from "../../components/apply/Info";
import ApplicationForm from "../../components/apply/ApplyForm";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import type { ApplyOption } from "../../types/apply/types";
// 임시 지역 옵션
const REGION_OPTIONS: ApplyOption[] = [
  { label: "전지역", value: 1 },
  { label: "서울·강남구", value: 201 },
  { label: "서울·마포구", value: 202 },
];

export default function ApplyPage() {
  const { crewId: crewIdParam } = useParams();
  const crewId = Number(crewIdParam);
  const userId = useAuthStore((s) => s.user?.id ?? 0);

  if (!Number.isFinite(crewId)) {
    return <div className="px-40 py-5">잘못된 크루 ID 입니다.</div>;
  }

  return (
    <div className="px-40 py-5">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-8">
        <Header crewId={crewId} />
        <Info crewId={crewId} />
        <ApplicationForm
          crewId={crewId}
          userId={userId}
          regionOptions={REGION_OPTIONS}
          showDebug
          onSubmit={async (body) => {
            console.log("🚀 submit body", { crewId, body });
            // await API.post(`/api/crew/${crewId}/apply`, body);
          }}
        />
      </div>
    </div>
  );
}
