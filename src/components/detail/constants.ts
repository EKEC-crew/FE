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
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
});

const roleCodeToLabel = (code: unknown): MyRole => {
  switch (Number(code)) {
    case 0:
      return "MEMBER";
    case 1:
      return "MANAGER";
    case 2:
      return "LEADER";
    default:
      return "GUEST";
  }
};

/** ===== 크루 정보 조회 ===== */
export const fetchCrewInfo = async (
  crewId: string | number
): Promise<CrewInfo> => {
  const url = `${API_BASE}/crew/${crewId}/info/`;
  const res = await authorizedFetch(url, {
    method: "GET",
  });
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      json?.error?.reason || `Crew info fetch failed (${res.status})`
    );
  }
  return json?.data as CrewInfo;
};

/** ===== 내 역할 조회 (로그인 필요) ===== */
export const fetchMyRole = async (crewId: string | number): Promise<MyRole> => {
  const url = `${API_BASE}/crew/${crewId}/myrole/`;
  const res = await authorizedFetch(url, {
    method: "GET",
  });

  if (res.status === 401) return "GUEST";

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(
      json?.error?.reason || `My role fetch failed (${res.status})`
    );
  }
  // 예: { resultType: "SUCCESS", data: { memberId: 3, role: 0 } }
  return roleCodeToLabel(json?.data?.role);
};

/** ===== 크루 소개 수정 (크루장 전용) ===== */
export const updateCrewIntroduction = async (
  crewId: string | number,
  introduction: string
): Promise<{ crewId: number; introduction: string }> => {
  const url = `${API_BASE}/crew/${crewId}/info/introduce`;
  const res = await authorizedFetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // authorizedFetch가 Authorization 붙여주더라도, PUT에는 Content-Type만 추가
      ...authHeaders(),
    },
    body: JSON.stringify({ introduction }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(
      json?.error?.reason || `Update intro failed (${res.status})`
    );
  }
  return json?.data as { crewId: number; introduction: string };
};
