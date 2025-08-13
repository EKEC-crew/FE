import { useEffect, useMemo, useState } from "react";
import OptionGrid from "../crewCreate/OptionGrid";
import {
  categoryOptions,
  activityOptions,
  styleOptions,
  ageGroupOptions,
} from "../crewList/optionsDummy";
import type { ApplyOption, CommonAnswers } from "../../types/apply/types";
import { applicantGenderOptions } from "../../types/apply/types";

type SelectedFlags = {
  category: 0 | 1;
  region: 0 | 1;
  age: 0 | 1;
  gender: 0 | 1;
};

type Step1Map = {
  category?: number; // 크루장이 선택한 매핑값 (없으면 제한 X)
  region?: number;
  age?: number;
  gender?: number;
};

interface Props {
  /** 크루장이 고정한 매핑값 (없으면 제한 없음) */
  step1Map: Step1Map;

  /** 단일 항목 선택 여부 플래그(1/0) - 컨트롤드 가능 */
  selected?: SelectedFlags;
  onChangeSelected?: (f: SelectedFlags) => void;

  /** 다중 항목(활동/스타일)은 그대로 값 배열로 관리 */
  onChange?: (next: CommonAnswers) => void;

  /** 지역 옵션 (label/value) */
  regionOptions: ApplyOption[];

  /** (선택) 추가 허용 목록이 있으면 우선 적용, 없으면 step1Map 값만 노출 */
  allowedCategories?: number[];
  allowedActivities?: number[];
  allowedStyles?: number[];
  allowedRegions?: number[];
  allowedAges?: number[];
  allowedGenders?: number[]; // []면 성별 UI 숨김(=무관)
}

export default function CommonQuestionFlagsOnly({
  step1Map,
  selected,
  onChangeSelected,
  onChange,
  regionOptions,
  allowedCategories,
  allowedActivities,
  allowedStyles,
  allowedRegions,
  allowedAges,
  allowedGenders,
}: Props) {
  // 다중 선택은 원래대로 값 배열
  const [activities, setActivities] = useState<number[]>([]);
  const [styles, setStyles] = useState<number[]>([]);

  // 플래그: 컨트롤드 or 로컬
  const [flags, setFlags] = useState<SelectedFlags>(
    selected ?? { category: 0, region: 0, age: 0, gender: 0 }
  );
  useEffect(() => {
    if (selected) setFlags(selected);
  }, [selected]);

  const setFlagsSafe = (next: SelectedFlags) => {
    onChangeSelected ? onChangeSelected(next) : setFlags(next);
  };

  const genderFree =
    Array.isArray(allowedGenders) && allowedGenders.length === 0;

  /** 옵션 필터: allowed* 우선, 없으면 step1Map 값만 노출 */
  const filter = (
    opts: ApplyOption[],
    allow?: number[],
    fallbackOne?: number
  ) => {
    if (allow && Array.isArray(allow))
      return opts.filter((o) => allow.includes(o.value));
    if (fallbackOne && fallbackOne > 0)
      return opts.filter((o) => o.value === fallbackOne);
    return opts; // 완전 자유
  };

  const categoryOpts = useMemo(
    () =>
      filter(
        categoryOptions as ApplyOption[],
        allowedCategories,
        step1Map.category
      ),
    [allowedCategories, step1Map.category]
  );
  const regionOpts = useMemo(
    () => filter(regionOptions, allowedRegions, step1Map.region),
    [regionOptions, allowedRegions, step1Map.region]
  );
  const ageOpts = useMemo(
    () => filter(ageGroupOptions as ApplyOption[], allowedAges, step1Map.age),
    [allowedAges, step1Map.age]
  );
  const genderOpts = useMemo(
    () => filter(applicantGenderOptions, allowedGenders, step1Map.gender),
    [allowedGenders, step1Map.gender]
  );
  const activityOpts = useMemo(
    () =>
      filter(activityOptions as ApplyOption[], allowedActivities, undefined),
    [allowedActivities]
  );
  const styleOpts = useMemo(
    () => filter(styleOptions as ApplyOption[], allowedStyles, undefined),
    [allowedStyles]
  );

  /** 화면에 내려줄 selected 값: flag==1이면 매핑값, 아니면 0(미선택) */
  const catSelected = flags.category ? (step1Map.category ?? 0) : 0;
  const regSelected = flags.region ? (step1Map.region ?? 0) : 0;
  const ageSelected = flags.age ? (step1Map.age ?? 0) : 0;
  const genSelected = flags.gender ? (step1Map.gender ?? 0) : 0;

  /** 클릭 시: OptionGrid가 v=0(해제) 또는 v=실제옵션값(선택)으로 줌 → 0/1로만 저장 */
  const onToggle = (key: keyof SelectedFlags) => (v: number) => {
    // v===0 → 미선택(0), v>0 → 선택(1)
    const next = { ...flags, [key]: v === 0 ? 0 : 1 } as SelectedFlags;
    setFlagsSafe(next);
  };

  /** 부모로 합본 넘겨주고 싶으면 (선택) */
  useEffect(() => {
    if (!onChange) return;
    const common: CommonAnswers = {
      categoryId: catSelected,
      region: regSelected,
      age: ageSelected,
      gender: genSelected,
      activityList: activities,
      styleList: styles,
    };
    onChange(common);
  }, [
    catSelected,
    regSelected,
    ageSelected,
    genSelected,
    activities,
    styles,
    onChange,
  ]);

  /** 무관이면(=성별 UI 숨김 상태) 내부 플래그도 0으로 보정 */
  useEffect(() => {
    if (genderFree && flags.gender !== 0) {
      setFlagsSafe({ ...flags, gender: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderFree]);

  return (
    <div className="bg-[#F7F7FB] w-[54.6875rem] flex flex-col gap-6 p-6 rounded-[10px]">
      {/* 카테고리 */}
      {categoryOpts.length === 0 ? null : (
        <div>
          <OptionGrid
            type="single"
            options={categoryOpts}
            selected={catSelected}
            onChange={onToggle("category")}
            allowEmpty
            emptyValue={0}
          />
        </div>
      )}

      {/* 활동(다중) */}
      {activityOpts.length === 0 ? null : (
        <div>
          <OptionGrid
            type="multiple"
            options={activityOpts}
            selected={activities}
            onChange={setActivities}
          />
        </div>
      )}

      {/* 스타일(다중) */}
      {styleOpts.length === 0 ? null : (
        <div>
          <OptionGrid
            type="multiple"
            options={styleOpts}
            selected={styles}
            onChange={setStyles}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        {/* 지역 */}
        {regionOpts.length === 0 ? null : (
          <OptionGrid
            type="single"
            options={regionOpts}
            selected={regSelected}
            onChange={onToggle("region")}
            allowEmpty
            emptyValue={0}
          />
        )}

        {/* 나이 */}
        {ageOpts.length === 0 ? null : (
          <OptionGrid
            type="single"
            options={ageOpts}
            selected={ageSelected}
            onChange={onToggle("age")}
            allowEmpty
            emptyValue={0}
          />
        )}

        {/* 성별: 무관이면 섹션 자체를 숨김 */}
        {genderFree || genderOpts.length === 0 ? null : (
          <OptionGrid
            type="single"
            options={genderOpts}
            selected={genSelected}
            onChange={onToggle("gender")}
            allowEmpty
            emptyValue={0}
          />
        )}
      </div>
    </div>
  );
}
