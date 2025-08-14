import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { API } from "../../apis/axios";
import type { Crew } from "@/types/crewCreate/crew";

type Resp = { crews: Crew[]; count: number };

// 배열 → 서버 쿼리 형태로 변환
function toQuery(p: {
  name?: string;
  category?: number[];
  activity?: number[];
  style?: number[];
  regionSido?: string;
  regionGu?: string;
  age?: number | null;
  gender?: number | null;
  capacity?: number | null;
  page: number;
  sort: number;
}) {
  const q: Record<string, any> = { page: p.page, sort: p.sort };
  if (p.name?.trim()) q.name = p.name.trim();
  if (p.category?.length) q.category = p.category.join(",");
  if (p.activity?.length) q.activity = p.activity.join(",");
  if (p.style?.length) q.style = p.style.join(",");
  if (p.regionSido) q.regionSido = p.regionSido;
  if (p.regionGu) q.regionGu = p.regionGu;
  if (p.age != null) q.age = p.age;
  if (p.gender != null) q.gender = p.gender;
  if (p.capacity && p.capacity > 0) q.capacity = p.capacity;
  return q;
}

export function useCrewSearchDetail(params: {
  name?: string;
  category?: number[];
  activity?: number[];
  style?: number[];
  regionSido?: string;
  regionGu?: string;
  age?: number | null;
  gender?: number | null;
  capacity?: number | null;
  page: number;
  sort: number;
}) {
  return useQuery<Resp, Error>({
    queryKey: ["crewSearchDetail", params],
    queryFn: ({ signal }) =>
      API.get("/crew/search/detail", {
        params: toQuery(params),
        signal,
      }).then((r) => r.data.data as Resp),
    placeholderData: keepPreviousData,
  });
}
