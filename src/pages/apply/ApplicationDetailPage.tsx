import { useParams } from "react-router-dom";
import Header from "../../components/apply/Header";
import Info from "../../components/apply/Info";
import ApplyDetailReadonly from "../../components/apply/applyDetail/ApplyDetailStep1";
import type { ApplyOption } from "../../types/apply/types";
import { useApplicationDetail } from "../../hooks/apply/useAppicationDetail";
import { mapSelectedValues } from "../../utils/apply/mapSelectedValues";
import { mapStep2ToView } from "../../utils/apply/mapStep2";
import ApplyStep2Readonly from "../../components/apply/applyDetail/ApplyDetailStep2";

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

  const raw = (initData as any)?.rawStep1 ?? (initData as any)?.success?.step1;
  const { allowed, selected } = mapSelectedValues(data, raw);

  const step2Questions =
    (initData as any)?.success?.step2 ?? (initData as any)?.step2 ?? [];
  const step2Items = mapStep2ToView(step2Questions, data);

  return (
    <div className="px-40 py-5">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-8">
        <Header />
        <Info />
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
        <ApplyStep2Readonly items={step2Items} />
      </div>
    </div>
  );
}
