import { resolveSingle, resolveCategoryId } from "./selection";

export const mapSelectedValues = (detail: any, raw: any) => {
  const allowedCategories: number[] = raw?.category ? [raw.category] : [];
  const allowedRegions: number[] = raw?.region ? [raw.region] : [];
  const allowedAges: number[] = raw?.age ? [raw.age] : [];
  const allowedGenders: number[] = raw?.gender === 0 ? [] : [raw?.gender ?? 0];
  const allowedActivities: number[] = Array.isArray(raw?.activities)
    ? raw.activities
    : [];
  const allowedStyles: number[] = Array.isArray(raw?.styles) ? raw.styles : [];

  const selected = {
    categoryId: resolveCategoryId({
      detail,
      rawCategory: raw?.category,
      allowedCategories,
    }),
    regionId: resolveSingle({
      idCandidate: detail?.regionId,
      flag: detail?.region,
      rawId: raw?.region,
      allowed: allowedRegions,
    }),
    ageId: resolveSingle({
      idCandidate: detail?.ageId,
      flag: detail?.age,
      rawId: raw?.age,
      allowed: allowedAges,
    }),
    genderId: resolveSingle({
      idCandidate: detail?.genderId,
      flag: detail?.gender,
      rawId: raw?.gender,
      allowed: allowedGenders.length ? allowedGenders : [0, 1, 2],
    }),
    activityIds:
      (Array.isArray(detail?.activityList) && detail.activityList) ||
      (Array.isArray(detail?.activities) && detail.activities) ||
      [],
    styleIds:
      (Array.isArray(detail?.styleList) && detail.styleList) ||
      (Array.isArray(detail?.styles) && detail.styles) ||
      [],
  };

  return {
    allowed: {
      categories: allowedCategories,
      regions: allowedRegions,
      ages: allowedAges,
      genders: allowedGenders,
      activities: allowedActivities,
      styles: allowedStyles,
    },
    selected,
  };
};
