// “처음 검색”용: name 또는 단일 태그만 + page/sort (순서 고정)
export function buildFreshQS(p: {
  name?: string;
  category?: number;
  activity?: number;
  style?: number;
  page?: number; // 기본 1
  sort?: number; // 기본 2
}) {
  const sp = new URLSearchParams();
  // 순서 고정: page, sort, name, category, activity, style
  sp.set("page", String(p.page ?? 1));
  sp.set("sort", String(p.sort ?? 2));
  if (p.name?.trim()) sp.set("name", p.name.trim());
  if (p.category != null) sp.set("category", String(p.category));
  if (p.activity != null) sp.set("activity", String(p.activity));
  if (p.style != null) sp.set("style", String(p.style));
  return sp.toString();
}

// 상세검색용: 리스트 페이지 상태 -> URL
export function buildDetailQS(p: {
  page: number;
  sort: number;
  name?: string;
  category: number[];
  activity: number[];
  style: number[];
  regionSido?: string;
  regionGu?: string;
  age?: number | null;
  gender?: number | null;
  capacity?: number | null;
}) {
  const sp = new URLSearchParams();
  // 순서 고정
  sp.set("page", String(p.page));
  sp.set("sort", String(p.sort));
  if (p.name?.trim()) sp.set("name", p.name.trim());
  if (p.category?.length) sp.set("category", p.category.join(","));
  if (p.activity?.length) sp.set("activity", p.activity.join(","));
  if (p.style?.length) sp.set("style", p.style.join(","));
  if (p.regionSido) sp.set("regionSido", p.regionSido);
  if (p.regionGu) sp.set("regionGu", p.regionGu);
  if (p.age != null) sp.set("age", String(p.age));
  if (p.gender != null) sp.set("gender", String(p.gender));
  if (p.capacity && p.capacity > 0) sp.set("capacity", String(p.capacity));
  return sp.toString();
}
