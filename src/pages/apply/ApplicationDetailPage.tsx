import { useParams } from "react-router-dom";
import Header from "../../components/apply/Header";
import Info from "../../components/apply/Info";
import ApplyDetailReadonly from "../../components/apply/applyDetail/ApplyDetailStep1";
import type { ApplyOption } from "../../types/apply/types";
import { useApplicationDetail } from "../../hooks/apply/useAppicationDetail";
import { mapSelectedValues } from "../../utils/apply/mapSelectedValues";
import ApplyStep2Readonly from "../../components/apply/applyDetail/ApplyDetailStep2";
import ApplyStepHeader from "../../components/apply/common/ApplyStepHeader";
import { ApproveBtn } from "../../components/apply/applyDetail/ApproveBtn";

const REGION_OPTIONS: ApplyOption[] = [
  { label: "전지역", value: 1 },
  { label: "서울·강남구", value: 201 },
  { label: "서울·마포구", value: 202 },
  { label: "서울·송파구", value: 203 },
];

export default function ApplicationDetailPage() {
  const { crewId: crewIdParam, applyId: applyIdParam } = useParams();
  const crewId = Number(crewIdParam);
  const applyId = Number(applyIdParam);

  if (!Number.isFinite(crewId) || !Number.isFinite(applyId)) {
    return <div className="px-40 py-5">잘못된 경로입니다.</div>;
  }

  const { detailQuery, initQuery } = useApplicationDetail(crewId, applyId);
  const { data, isLoading, isError, error } = detailQuery;
  const {
    data: initData,
    isLoading: initLoading,
    error: initError,
  } = initQuery;

  if (isLoading || initLoading)
    return <div className="px-40 py-5">불러오는 중...</div>;
  if (isError || !data) {
    return (
      <div className="px-40 py-5">
        에러: {(error as Error)?.message || "불러오기 실패"}
      </div>
    );
  }
  if (initError) console.warn("initError:", initError);

  // STEP1 매핑
  const raw = (initData as any)?.rawStep1 ?? (initData as any)?.success?.step1;
  const { allowed, selected } = mapSelectedValues(data, raw);

  // STEP2 질문(폼) 가져오기
  const step2Questions =
    (initData as any)?.success?.step2 ?? (initData as any)?.step2 ?? [];

  // (선택) 만약 ApplyStep2Readonly가 items를 받도록 되어 있다면 이 라인 사용:
  // const step2Items = mapStep2ToView(step2Questions, data);

  return (
    <div className="px-40 py-5">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-8">
        <Header />
        <Info />
        <section>
          <ApplyStepHeader
            step={1}
            title="본인에게 맞는 성향을 선택해주세요"
            required
          />
          {/* STEP 1 읽기 전용 */}
          <ApplyDetailReadonly
            allowedCategories={allowed.categories}
            allowedActivities={allowed.activities}
            allowedStyles={allowed.styles}
            allowedRegions={allowed.regions}
            allowedAges={allowed.ages}
            allowedGenders={allowed.genders}
            selected={selected}
            regionOptions={REGION_OPTIONS}
          />
        </section>
        {/* STEP 2 읽기 전용 */}
        <section>
          <ApplyStepHeader
            step={2}
            title="지원자를 운영진에게 소개해주세요"
            required
          />
          <ApplyStep2Readonly
            questions={step2Questions}
            detail={(data as any)?.success ?? data}
          />
        </section>
        <ApproveBtn
          crewId={crewId}
          applyId={applyId}
          onSuccess={() => {
            alert("처리 완료!");
            // 또는 toast.success('처리 완료!');
          }}
          onError={(errorMessage) => {
            alert(errorMessage); // "이미 크루 멤버입니다." 표시
            // 또는 toast.error(errorMessage);
          }}
        />
      </div>
    </div>
  );
}
