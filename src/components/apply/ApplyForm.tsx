// src/components/apply/ApplicationForm.tsx
import { useMemo, useState } from "react";
import ApplyStepHeader from "./ApplyStepHeader";
import ApplySubmitBar from "./ApplySubmitBar";
import CommonQuestionFlagsOnly from "./ApplyStep1";
import CustomQuestionsForm from "./ApplyStep1Form";
import { useApplyInit } from "../../hooks/apply/useCustomQusetion";
import type {
  ApiStep1,
  ApiQuestion,
  ApplyOption,
  CommonAnswers,
} from "../../types/apply/types";
import { toApiStep1FromCommonAnswers } from "../../types/apply/types";
import type { ApplyRequestBody, ApplyAnswer } from "../../types/apply/types";
import { useApplySubmit } from "../../hooks/apply/useApply";
import ApplyModal from "./ApplyModal";
import { useNavigate } from "react-router-dom";

type SelectedFlags = {
  category: 0 | 1;
  region: 0 | 1;
  age: 0 | 1;
  gender: 0 | 1;
};

export default function ApplicationForm({
  crewId,
  userId,
  regionOptions,
  onChangeAnswers,
}: {
  crewId: number;
  userId: number;
  regionOptions: ApplyOption[];
  onSubmit: (body: ApplyRequestBody) => Promise<void> | void;
  onChangeAnswers?: (answers: ApplyAnswer[]) => void;
  submitLabel?: string;
  showDebug?: boolean;
}) {
  //지원하기 api 연결
  const { mutateAsync, isPending } = useApplySubmit();
  // 모달 변수 생성
  const [showComplete, setShowComplete] = useState(false);
  //네비게이트 연결
  const navigate = useNavigate();
  // 1) 초기 데이터 로드
  const { data, isLoading, isError, error } = useApplyInit(crewId);

  // 2) step1 추출
  const defaultStep1: ApiStep1 = useMemo(
    () => ({
      gender: 0,
      styles: [],
      activities: [],
      region: 0,
      category: 0,
      age: 0,
    }),
    []
  );
  const step1: ApiStep1 = useMemo(() => {
    const fromSuccess = (data as any)?.success?.step1 as ApiStep1 | undefined;
    if (fromSuccess) return fromSuccess;
    const raw = (data as any)?.rawStep1 as ApiStep1 | undefined;
    if (raw) return raw;
    const front = (data as any)?.step1 as CommonAnswers | undefined;
    if (front) return toApiStep1FromCommonAnswers(front);
    return defaultStep1;
  }, [data, defaultStep1]);

  const questions: ApiQuestion[] = useMemo(() => {
    const fromSuccess = (data as any)?.success?.step2 as
      | ApiQuestion[]
      | undefined;
    if (fromSuccess) return fromSuccess;
    return ((data as any)?.step2 as ApiQuestion[]) ?? [];
  }, [data]);

  // 3) STEP1 상태 (플래그 & 리스트)
  const [flags, setFlags] = useState<SelectedFlags>({
    category: 0,
    region: 0,
    age: 0,
    gender: 0,
  });
  const [activityList, setActivityList] = useState<number[]>([]);
  const [styleList, setStyleList] = useState<number[]>([]);

  // 4) STEP2 상태
  const [answers, setAnswers] = useState<ApplyAnswer[]>([]);
  const [valid, setValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  // step1 제한
  const allowedCategories = useMemo(
    () => (step1.category ? [step1.category] : []),
    [step1.category]
  );
  const allowedRegions = useMemo(
    () => (step1.region ? [step1.region] : []),
    [step1.region]
  );
  const allowedAges = useMemo(
    () => (step1.age ? [step1.age] : []),
    [step1.age]
  );
  const allowedGenders = useMemo(
    () => (step1.gender === 0 ? [] : [step1.gender]),
    [step1.gender]
  );
  const allowedActivities = useMemo(
    () => step1.activities ?? [],
    [step1.activities]
  );
  const allowedStyles = useMemo(() => step1.styles ?? [], [step1.styles]);

  const step1Map = useMemo(
    () => ({
      category: step1.category || undefined,
      region: step1.region || undefined,
      age: step1.age || undefined,
      gender: step1.gender || undefined,
    }),
    [step1.category, step1.region, step1.age, step1.gender]
  );

  // 제출 바디(플래그 전송)
  const buildStep1Flags = () => ({
    activityList,
    styleList,
    categoryFlag: flags.category,
    regionFlag: flags.region,
    ageFlag: flags.age,
    genderFlag: step1.gender === 0 ? 0 : flags.gender, // 무관이면 0
  });

  return (
    <div className="flex flex-col gap-8">
      {/* STEP 1 */}
      <section>
        <ApplyStepHeader
          step={1}
          title="성향 중 본인에게 맞는 성향을 선택해주세요"
          required
        />
        <CommonQuestionFlagsOnly
          step1Map={step1Map}
          regionOptions={regionOptions}
          allowedCategories={allowedCategories}
          allowedActivities={allowedActivities}
          allowedStyles={allowedStyles}
          allowedRegions={allowedRegions}
          allowedAges={allowedAges}
          allowedGenders={allowedGenders}
          selected={flags}
          onChangeSelected={setFlags}
          onChange={(common) => {
            setActivityList(common.activityList ?? []);
            setStyleList(common.styleList ?? []);
          }}
        />
      </section>

      {/* STEP 2 */}
      <section>
        <ApplyStepHeader
          step={2}
          title="크루장이 준비한 질문에 답해주세요"
          required
        />
        <CustomQuestionsForm
          questions={questions}
          onChange={(a) => {
            setAnswers(a);
            onChangeAnswers?.(a as ApplyAnswer[]);
          }}
          onValidateChange={(ok, message) => {
            setValid(ok);
            setErrorMsg(message);
          }}
        />
        {!valid && errorMsg && (
          <div className="mt-2 text-sm text-[#FF4949]">{errorMsg}</div>
        )}
      </section>

      {/* SUBMIT BAR */}

      <ApplySubmitBar
        disabled={
          isLoading || isPending || !valid || !userId || questions.length === 0
        }
        onSubmit={async () => {
          const s1 = buildStep1Flags();
          const body: ApplyRequestBody = {
            userId,
            activityList: s1.activityList,
            styleList: s1.styleList,
            region: s1.regionFlag,
            age: s1.ageFlag,
            gender: s1.genderFlag,
            categoryId: s1.categoryFlag,
            answers,
          };

          try {
            await mutateAsync({ crewId, body });
            // 성공 시 모달 열기
            setShowComplete(true);
          } catch (err: any) {
            // 실패 시 경고창 or 토스트
            const msg =
              err?.response?.data?.message ||
              "지원에 실패했습니다. 잠시 후 다시 시도해주세요.";
            alert(msg);
          }
        }}
      />
      {showComplete && (
        <ApplyModal
          onClose={() => {
            setShowComplete(false);
            // 원하는 UX로 이동 (예: 해당 크루 상세)
            navigate(`/crew/${crewId}`);
          }}
        />
      )}
      {/* 로딩/에러 */}
      {isLoading && <div>불러오는 중...</div>}
      {isError && (
        <div className="text-red-500">에러: {(error as Error)?.message}</div>
      )}
    </div>
  );
}
