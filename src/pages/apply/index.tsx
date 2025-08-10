// src/pages/apply/index.tsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/apply/Header";
import Info from "../../components/apply/Info";

import type {
  ApplyOption,
  ApiStep1,
  ApiQuestion,
  CommonAnswers,
} from "../../types/apply/types";
import { toApiStep1FromCommonAnswers } from "../../types/apply/types";

import { useApplyInit } from "../../hooks/apply/useCustomQusetion";
import CommonQuestionFlagsOnly from "../../components/apply/CommonQuestion";
import CustomQuestionsForm from "../../components/apply/CustomQuestionForm";

// 하드코딩 지역 옵션 (임시)
const REGION_OPTIONS: ApplyOption[] = [
  { label: "전지역", value: 1 },
  { label: "서울·강남구", value: 201 },
  { label: "서울·마포구", value: 202 },
];

// 선택 플래그 (선택하면 1, 아니면 0)
type SelectedFlags = {
  category: 0 | 1;
  region: 0 | 1;
  age: 0 | 1;
  gender: 0 | 1;
};

// 서버 제출 answers 타입(컴포넌트 내부 관리용: 장문은 string으로 유지)
type Step2AnswerLocal =
  | { recruitFormId: number; checkedChoices: string[]; answer?: never }
  | { recruitFormId: number; answer: string; checkedChoices?: never };

// 서버 전송용 타입(제출 직전 변환 후: 장문은 string | null)
type Step2AnswerForServer =
  | { recruitFormId: number; checkedChoices: string[]; answer?: never }
  | { recruitFormId: number; answer: string | null; checkedChoices?: never };

function ApplyPage() {
  const { crewId: crewIdParam } = useParams();
  const crewId = Number(crewIdParam);

  // ✅ API 훅
  const { data, isLoading, isError, error } = useApplyInit(crewId);

  // ✅ 공통 플래그/리스트 상태
  const [flags, setFlags] = useState<SelectedFlags>({
    category: 0,
    region: 0,
    age: 0,
    gender: 0,
  });
  const [activityList, setActivityList] = useState<number[]>([]);
  const [styleList, setStyleList] = useState<number[]>([]);

  // ✅ 개별 질문: 응답 & 검증
  const [step2Answers, setStep2Answers] = useState<Step2AnswerLocal[]>([]);
  const [step2Valid, setStep2Valid] = useState(true);
  const [step2ErrorMsg, setStep2ErrorMsg] = useState<string | undefined>();

  // ✅ 기본 step1 (가드)
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

  // ✅ 서버 응답에서 step1/step2 안전 추출
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

  const recruitMessage: string | undefined = useMemo(
    () =>
      (data as any)?.success?.recruitMessage ?? (data as any)?.recruitMessage,
    [data]
  );

  // ✅ 화면 옵션 제한(서버가 내려준 step1 값만 허용)
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
  // 성별: 0(무관)이면 필터 UI 숨김, 아니면 해당 값만
  const allowedGenders = useMemo(
    () => (step1.gender === 0 ? [] : [step1.gender]),
    [step1.gender]
  );
  const allowedActivities = useMemo(
    () => step1.activities ?? [],
    [step1.activities]
  );
  const allowedStyles = useMemo(() => step1.styles ?? [], [step1.styles]);

  // ✅ UI 표시용
  const step1Map = useMemo(
    () => ({
      category: step1.category || undefined,
      region: step1.region || undefined,
      age: step1.age || undefined,
      gender: step1.gender || undefined,
    }),
    [step1.category, step1.region, step1.age, step1.gender]
  );

  // -------------------------------
  // 🔧 제출 바디 구성
  // -------------------------------
  const pickIdByFlag = (flag: 0 | 1, allowed: number[]) =>
    flag === 1 && allowed.length > 0 ? allowed[0] : 0;

  const buildSubmitStep1 = () => {
    // genderId: 서버 step1이 0(무관)이면 항상 0, 아니면 flag에 따라 값/0
    const genderId =
      step1.gender === 0 ? 0 : pickIdByFlag(flags.gender, allowedGenders);

    return {
      // ✅ 실제 id 값
      categoryId: pickIdByFlag(flags.category, allowedCategories),
      region: pickIdByFlag(flags.region, allowedRegions),
      age: pickIdByFlag(flags.age, allowedAges),
      gender: genderId,

      // ✅ 선택 여부 플래그(0|1)
      categoryFlag: flags.category,
      regionFlag: flags.region,
      ageFlag: flags.age,
      genderFlag: step1.gender === 0 ? 0 : flags.gender,

      // ✅ 리스트
      activityList,
      styleList,
    };
  };

  // 제출 버튼 활성 조건
  const isSubmitDisabled = useMemo(() => !step2Valid, [step2Valid]);

  // -------------------------------
  // 🔷 렌더
  // -------------------------------
  return (
    <div className="px-40 py-5">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-8">
        <Header />
        <Info />

        {isLoading && <div>불러오는 중...</div>}
        {isError && (
          <div className="text-red-500">에러: {(error as Error)?.message}</div>
        )}

        {!isLoading && !isError && (
          <>
            {recruitMessage && (
              <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
                {recruitMessage}
              </div>
            )}

            {/* STEP 1: 공통 질문 */}
            <div>
              <div className="mb-2 flex items-center gap-2 pb-[4px]">
                <div className="flex h-[28px] w-[78px] items-center justify-center rounded-[6px] bg-[#3A3ADB] text-white">
                  STEP 1
                </div>
                <div>
                  성향 중 본인에게 맞는 성향을 선택해주세요{" "}
                  <span className="text-[#FF4949]">*</span>
                </div>
              </div>

              <CommonQuestionFlagsOnly
                step1Map={step1Map}
                regionOptions={REGION_OPTIONS}
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
            </div>

            {/* STEP 2: 개별 질문 */}
            <div>
              <div className="mb-2 flex items-center gap-2 pb-[4px]">
                <div className="flex h-[28px] w-[78px] items-center justify-center rounded-[6px] bg-[#3A3ADB] text-white">
                  STEP 2
                </div>
                <div>
                  크루장이 준비한 질문에 답해주세요{" "}
                  <span className="text-[#FF4949]">*</span>
                </div>
              </div>

              <CustomQuestionsForm
                questions={questions}
                onChange={(answers) => setStep2Answers(answers)}
                onValidateChange={(ok, message) => {
                  setStep2Valid(ok);
                  setStep2ErrorMsg(message);
                }}
              />

              {!step2Valid && step2ErrorMsg && (
                <div className="mt-2 text-sm text-[#FF4949]">
                  {step2ErrorMsg}
                </div>
              )}
            </div>

            {/* 제출 */}
            <div className="flex items-center gap-3">
              <button
                className={`mt-2 rounded px-4 py-2 text-white ${
                  isSubmitDisabled
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-[#3A3ADB]"
                }`}
                disabled={isSubmitDisabled}
                onClick={() => {
                  const step1Body = buildSubmitStep1();

                  // ✅ 장문형은 빈 값이면 null로 변환
                  const processedAnswers: Step2AnswerForServer[] =
                    step2Answers.map((ans) => {
                      if ("checkedChoices" in ans) {
                        return {
                          recruitFormId: ans.recruitFormId,
                          checkedChoices: ans.checkedChoices ?? [],
                        };
                      }
                      // 장문형
                      return {
                        recruitFormId: ans.recruitFormId,
                        answer:
                          ans.answer && ans.answer.trim() !== ""
                            ? ans.answer
                            : null,
                      };
                    });

                  const body = {
                    userId: 2, // TODO: 실제 로그인 유저 id (세션이면 제거)
                    // ✅ 리스트
                    activityList: step1Body.activityList,
                    styleList: step1Body.styleList,

                    region: step1Body.regionFlag,
                    age: step1Body.ageFlag,
                    gender: step1Body.genderFlag,
                    categoryId: step1Body.categoryFlag,

                    // ✅ 개별 질문(체크박스 빈 배열 유지, 장문 빈 값 → null)
                    answers: processedAnswers,
                  };

                  console.log("🚀 submit body", { crewId, body });
                  // await API.post(`/api/crew/${crewId}/apply`, body);
                }}
              >
                제출하기
              </button>

              <button
                className="mt-2 rounded border border-gray-300 px-4 py-2"
                onClick={() => {
                  console.log("🧪 flags", flags);
                  console.log("🧪 activities/styles", activityList, styleList);
                  console.log("🧪 step2 answers (raw)", step2Answers);
                }}
              >
                디버그 로그
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApplyPage;
