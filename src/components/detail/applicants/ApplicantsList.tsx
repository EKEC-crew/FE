import { useParams } from "react-router-dom";
import ApplicantCard from "./ApplicantCard";
import { useApplicants } from "../../../hooks/apply/useApplicants";
import { useInfinite } from "../../../hooks/apply/useInfinite";

export default function ApplicantsList() {
  const { crewId: crewIdParam } = useParams();
  const crewId = Number(crewIdParam);

  // 1) 데이터 가져오기
  const { data, isLoading, isError } = useApplicants(crewId);

  // 2) 무한 노출 훅 사용
  const { ref, visible, hasMore } = useInfinite(data?.all ?? [], {
    pageSize: 10,
  });

  if (!crewId) return <p className="text-red-500">유효하지 않은 크루 ID</p>;
  if (isLoading)
    return <p className="text-center mt-4">데이터 불러오는 중...</p>;
  if (isError) return <p className="text-center mt-4">불러오기 실패</p>;

  return (
    <div className="p-[1.5rem] px-[3rem] py-[2.5rem] bg-white rounded-xl shadow w-[82.625rem] mx-auto">
      <div className="text-[2.25rem] font-semibold mb-[0.5rem]">
        지원자 목록
      </div>
      <p className="text-sm text-gray-500 mb-[1rem]">
        전체 {data?.totalCount ?? 0}명
      </p>

      <div className="flex flex-col gap-[1rem]">
        {visible.map((a) => (
          <ApplicantCard
            key={a.applyid}
            name={a.nickname}
            date={a.appliedAt.slice(0, 10)}
            crewId={crewId}
            applyId={a.applyid}
            onConfirm={() => console.log(`${a.nickname} 확인하기 클릭`)}
          />
        ))}
      </div>

      {/* 바닥 센티널 */}
      <div ref={ref} className="h-10" />
      {hasMore && <p className="text-center mt-4">더 불러오는 중...</p>}
    </div>
  );
}
