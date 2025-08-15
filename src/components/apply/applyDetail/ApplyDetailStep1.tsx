import { useMemo } from "react";
import OptionGrid from "../../crewCreate/OptionGrid";
import {
  categoryOptions as _categoryOptions,
  activityOptions as _activityOptions,
  styleOptions as _styleOptions,
  ageGroupOptions as _ageGroupOptions,
} from "../../crewList/optionsDummy";
import { applicantGenderOptions as _applicantGenderOptions } from "../../../types/apply/types";
import type { ApplyOption } from "../../../types/apply/types";

/** 조회용: 특정 지원서의 실제 선택값 */
export type CommonSelected = {
  categoryId?: number;
  regionId?: number;
  ageId?: number;
  genderId?: number;
  activityIds?: number[];
  styleIds?: number[];
};

type Props = {
  allowedCategories: number[];
  allowedActivities: number[];
  allowedStyles: number[];
  allowedRegions: number[];
  allowedAges: number[];
  allowedGenders: number[]; // []면 성별 섹션 숨김
  selected: CommonSelected;
  /** 지역 라벨/값 목록 (옵션, 없으면 임시 라벨 "지역#id") */
  regionOptions?: ApplyOption[];
};

/* ========= helpers ========= */
const toNum = (v: unknown) =>
  typeof v === "string" ? Number(v) : ((v as number) ?? 0);

const normalizeOptions = (opts: ApplyOption[]) =>
  (opts ?? []).map((o) => ({ ...o, value: toNum(o.value) }));

const filterByAllowed = (opts: ApplyOption[], allowed: number[]) => {
  if (!allowed || allowed.length === 0) return opts;
  const allow = new Set(allowed.map(toNum));
  return opts.filter((o) => allow.has(toNum(o.value)));
};

// 선택값이 옵션에 없을 때 임시로 추가(읽기전용 안전장치)
const ensureOption = (opts: ApplyOption[], id?: number, prefix = "옵션") => {
  const sel = toNum(id);
  if (!sel) return opts;
  return opts.some((o) => toNum(o.value) === sel)
    ? opts
    : [...opts, { label: `${prefix}#${sel}`, value: sel }];
};

/* ========= component ========= */
export default function ApplyDetailStep1({
  allowedCategories,
  allowedActivities,
  allowedStyles,
  allowedRegions,
  allowedAges,
  allowedGenders,
  selected,
  regionOptions = [],
}: Props) {
  // 옵션 정규화(값은 숫자)
  const categoryOptions = useMemo(
    () => normalizeOptions(_categoryOptions as ApplyOption[]),
    []
  );
  const activityOptions = useMemo(
    () => normalizeOptions(_activityOptions as ApplyOption[]),
    []
  );
  const styleOptions = useMemo(
    () => normalizeOptions(_styleOptions as ApplyOption[]),
    []
  );
  const ageGroupOptions = useMemo(
    () => normalizeOptions(_ageGroupOptions as ApplyOption[]),
    []
  );
  const applicantGenderOptions = useMemo(
    () => normalizeOptions(_applicantGenderOptions as ApplyOption[]),
    []
  );

  // 선택값
  const categorySelected = toNum(selected.categoryId) || 0;
  const regionSelected = toNum(selected.regionId) || 0;
  const ageSelected = toNum(selected.ageId) || 0;
  const genderSelected = toNum(selected.genderId) || 0;
  const activitySelected = (selected.activityIds ?? []).map(toNum);
  const styleSelected = (selected.styleIds ?? []).map(toNum);

  // 카테고리: 허용 필터 + 선택값 보장
  const categoryOpts = useMemo(() => {
    const base = filterByAllowed(categoryOptions, allowedCategories);
    return ensureOption(base, categorySelected, "카테고리");
  }, [categoryOptions, allowedCategories, categorySelected]);

  // 활동/스타일
  const activityOpts = useMemo(
    () => filterByAllowed(activityOptions, allowedActivities),
    [activityOptions, allowedActivities]
  );
  const styleOpts = useMemo(
    () => filterByAllowed(styleOptions, allowedStyles),
    [styleOptions, allowedStyles]
  );

  // 지역
  const regionOpts = useMemo(() => {
    // ★ allowedRegions가 빈 배열이면 빈 배열 반환 (아예 숨김)
    if (!allowedRegions || allowedRegions.length === 0) return [];

    if (regionOptions.length > 0) {
      const normalized = normalizeOptions(regionOptions);
      return filterByAllowed(normalized, allowedRegions);
    }

    return allowedRegions.map((id) => ({
      label: `지역#${id}`,
      value: toNum(id),
    }));
  }, [regionOptions, allowedRegions]);

  // ★ 성별/나이: 제한 없음이면 섹션 숨김
  const genderFree = allowedGenders.length === 0;
  const ageFree = allowedAges.length === 0; // ★ 추가

  // 연령대
  const ageOpts = useMemo(() => {
    if (ageFree) return []; // ★ 제한 없음 → UI 숨김
    return filterByAllowed(ageGroupOptions, allowedAges);
  }, [ageGroupOptions, allowedAges, ageFree]);

  // 성별
  const genderOpts = useMemo(() => {
    if (genderFree) return [];
    return filterByAllowed(applicantGenderOptions, allowedGenders);
  }, [applicantGenderOptions, allowedGenders, genderFree]);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="bg-[#F7F7FB] w-[54.6875rem] flex flex-col gap-6 p-6 rounded-[10px]">
          {/* 단일 선택 */}
          {categoryOpts.length > 0 && (
            <div>
              <OptionGrid
                type="single"
                options={categoryOpts}
                selected={categorySelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            </div>
          )}

          {/* 다중 선택 */}
          {activityOpts.length > 0 && (
            <div>
              <OptionGrid
                type="multiple"
                options={activityOpts}
                selected={activitySelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            </div>
          )}

          {styleOpts.length > 0 && (
            <div>
              <OptionGrid
                type="multiple"
                options={styleOpts}
                selected={styleSelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            </div>
          )}

          <div className="flex justify-start items-center gap-6">
            {regionOpts.length > 0 && (
              <OptionGrid
                type="single"
                options={regionOpts}
                selected={regionSelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            )}

            {ageOpts.length > 0 && (
              <OptionGrid
                type="single"
                options={ageOpts}
                selected={ageSelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            )}

            {!genderFree && genderOpts.length > 0 && (
              <OptionGrid
                type="single"
                options={genderOpts}
                selected={genderSelected}
                readOnly
                showIcons={false}
                onChange={() => {}}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
