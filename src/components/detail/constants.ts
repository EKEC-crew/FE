import { authorizedFetch } from "../../apis/client";

/** ===== 타입 ===== */
export type CrewInfo = {
  crewId: number;
  title: string;
  content: string;
  score: number;
  memberCount: number;
  crewCapacity: number;
  bannerImage: string | null;
  nickname: string;
  profileImage: string | null;
  category: string;
  introduction: string;
};

export type MyRole = "LEADER" | "MEMBER" | "GUEST" | "MANAGER";

/** ===== 공통 ===== */
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
// API_BASE는 다음 둘 중 아무 형태나 허용됨:
// 1) https://api.ekec.site
// 2) https://api.ekec.site/api

// '/api'가 정확히 한 번만 들어가도록 URL 생성
const apiUrl = (path: string) => {
  const p = path.replace(/^\/+/, "");
  const baseHasApi = /\/api$/.test(API_BASE);
  const pathStartsWithApi = /^api(\/|$)/.test(p);
  // base 또는 path 중 한쪽에만 /api가 있도록 정규화
  const normalizedPath = baseHasApi
    ? p.replace(/^api\/?/, "")                 // base가 .../api면, path의 api/ 제거
    : pathStartsWithApi ? p                    // base가 .../ (api 없음)이고 path가 api로 시작 → 그대로
    : `api/${p}`;                              // 둘 다 없으면 path에 api 추가

  return `${API_BASE}/${normalizedPath}`.replace(/\/+$/, "/");
};

// 공통 파서
type ApiEnvelope<T> = {
  resultType: "SUCCESS" | "FAIL";
  error?: { errorCode?: string; reason?: string; data?: unknown } | null;
  data?: T | null;
};
async function parseAndAssertSuccess<T>(res: Response, ctx: string): Promise<T> {
  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (import.meta.env.MODE !== "production") {
    console.log(`[${ctx}] status:`, res.status);
    console.log(`[${ctx}] json:`, json);
  }

  if (!res.ok || !json || json.resultType !== "SUCCESS" || json.data == null) {
    const reason =
      json?.error?.reason ||
      (res.ok ? "Unexpected response" : `HTTP ${res.status}`);
    throw new Error(`${ctx} failed: ${reason}`);
  }
  return json.data as T;
}

/** ===== 크루 정보 조회 ===== */
export const fetchCrewInfo = async (
  crewId: string | number
): Promise<CrewInfo> => {
  const url = apiUrl(`/crew/${crewId}/info/`);
  const res = await authorizedFetch(url, { method: "GET" });
  return parseAndAssertSuccess<CrewInfo>(res, "fetchCrewInfo");
};

/** ===== 역할 코드 → 라벨 ===== */
const roleCodeToLabel = (code: unknown): MyRole => {
  switch (Number(code)) {
    case 0: return "MEMBER";
    case 1: return "MANAGER";
    case 2: return "LEADER";
    default: return "GUEST";
  }
};

/** ===== 내 역할 조회 (로그인 필요) ===== */
export const fetchMyRole = async (crewId: string | number): Promise<MyRole> => {
  const url = apiUrl(`/crew/${crewId}/myrole/`);
  const res = await authorizedFetch(url, { method: "GET" });
  if (res.status === 401) return "GUEST"; // 비로그인 시 게스트 처리
  const data = await parseAndAssertSuccess<{ memberId?: number; role?: unknown }>(res, "fetchMyRole");
  return roleCodeToLabel(data.role);
};

/** ===== 크루 소개 수정 (크루장 전용) ===== */
export const updateCrewIntroduction = async (
  crewId: string | number,
  introduction: string
): Promise<{ crewId: number; introduction: string }> => {
  const url = apiUrl(`/crew/${crewId}/info/introduce`);
  const res = await authorizedFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ introduction }),
  });
  return parseAndAssertSuccess<{ crewId: number; introduction: string }>(
    res,
    "updateCrewIntroduction"
  );
};
