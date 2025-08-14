import { authorizedFetch } from "../../../apis/client";
import { privateAPI } from "../../../apis/axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

export const CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  TOTAL_PAGES: 5,
  CATEGORY: { NUMBER: 2, NAME: "공지", TOTAL_COUNT: 4 },
  LABELS: { REQUIRED: "필독", WRITE_BUTTON: "글쓰기", BOTTOM_SECTION: "미술너 사네" },
} as const;

export const fetchNoticeList = async (crewId: string, page = 1, size = 10) => {
  const url = `${API_BASE}/crew/${crewId}/notice/?page=${encodeURIComponent(
    String(page)
  )}&size=${encodeURIComponent(String(size))}`;
  const res = await authorizedFetch(url, { method: "GET" });
  const json = await res.json().catch(() => null);
  if (res.status >= 500) {
    return [];
  }
  if (!res.ok || json?.resultType !== "SUCCESS") {
    throw new Error(json?.error?.reason || `Notice list failed (${res.status})`);
  }
  const data = json?.data;
  return Array.isArray(data) ? data : data?.notices || [];
};

export const createNotice = async (
  crewId: string,
  title: string,
  content: string,
  options?: {
    isRequired?: boolean;
    allowComment?: boolean;
  }
) => {
  const body: any = { title, content };
  // 서버 요구사항: type은 0(일반) 또는 1(필수) 필수
  body.type = options?.isRequired ? 1 : 0;
  if (options?.allowComment !== undefined) body.allowComment = options.allowComment;

  const url = `/crew/${crewId}/notice/`;
  
  // 디버깅: 요청 정보 출력
  console.log("🚀 createNotice 요청:");
  console.log("URL:", url);
  console.log("Body:", body);
  console.log("Options:", options);

  try {
    const { data } = await privateAPI.post(url, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    
    console.log("✅ createNotice 성공:", data);
    return data ?? null;
  } catch (err: any) {
    console.error("❌ createNotice 실패:");
    console.error("에러 객체:", err);
    console.error("응답 상태:", err?.response?.status);
    console.error("응답 데이터 전체:", err?.response?.data);
    
    // 에러 상세 정보 추가 출력
    if (err?.response?.data?.error) {
      console.error("에러 코드:", err.response.data.error.errorCode);
      console.error("에러 이유:", err.response.data.error.reason);
      console.error("에러 데이터:", err.response.data.error.data);
    }
    
    console.error("응답 헤더:", err?.response?.headers);
    
    const reason = err?.response?.data?.error?.reason || err?.message || "Create failed";
    throw new Error(reason);
  }
};


export const fetchMyRole = async (crewId: string) => {
  const url = `${API_BASE}/crew/${crewId}/myrole/`;
  const res = await authorizedFetch(url, { method: "GET" });
  if (res.status === 403) return { role: "GUEST" as const };
  const json = await res.json().catch(() => null);
  
  // 디버깅: 응답 데이터 확인 추가
  console.log("🔍 fetchMyRole 응답:");
  console.log("상태 코드:", res.status);
  console.log("전체 응답:", json);
  console.log("역할 데이터:", json?.data);
  console.log("역할 값:", json?.data?.role);
  
  if (!res.ok || json?.resultType !== "SUCCESS") throw new Error(json?.error?.reason || `MyRole failed (${res.status})`);
  return json.data;
};

export const deleteNotice = async (crewId: string, noticeId: string) => {
  const url = `${API_BASE}/crew/${crewId}/notice/${noticeId}`;
  const res = await authorizedFetch(url, { method: "DELETE" });
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.resultType !== "SUCCESS") {
    throw new Error(json?.error?.reason || `HTTP ${res.status}`);
  }
  return json;
};
// 좋아요 토글 (POST)
export const toggleNoticeLike = async (crewId: string, noticeId: string) => {
  const url = `/crew/${crewId}/notice/${noticeId}/like`;
  try {
    const { data } = await privateAPI.post(url, {}, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return data; // { resultType, data: { isLiked, totalLikes, ... } }
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Like toggle failed";
    throw new Error(reason);
  }
};

// 공지 상세 조회
export const getNoticeDetail = async (crewId: string, noticeId: string) => {
  const url = `${API_BASE}/crew/${crewId}/notice/${noticeId}`;
  const res = await authorizedFetch(url, { method: "GET" });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error?.reason || `Notice detail failed (${res.status})`);
  return json;
};

// 댓글 목록 조회
export const fetchNoticeComments = async (
  crewId: string | number,
  noticeId: string | number
) => {
  const url = `/crew/${crewId}/notice/${noticeId}/comment/?ts=${Date.now()}`;
  try {
    const { data } = await privateAPI.get(url, {
      withCredentials: true,
      headers: { "Cache-Control": "no-cache" },
    });
    if (data?.resultType !== "SUCCESS") {
      throw new Error(data?.error?.reason || "Comment list failed");
    }
    const list = Array.isArray(data?.data) ? data.data : [];
    const normalized = list.map((c: any) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      author: c.author || c.writer || c.nickname || "",
    }));
    // 최신순 정렬 보장
    normalized.sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1));
    return { ...data, data: normalized };
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Comment list failed";
    throw new Error(reason);
  }
};

// ëŒ"ê¸€ ìƒì„±
export const createNoticeComment = async (
  crewId: string | number,
  noticeId: string | number,
  content: string
): Promise<any> => {
  const url = `/crew/${crewId}/notice/${noticeId}/comment/`;
  try {
    const { data } = await privateAPI.post(url, { content }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (data?.resultType !== "SUCCESS") throw new Error(data?.error?.reason || "Comment create failed");
    return data.data; 
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Comment create failed";
    throw new Error(reason);
  }
};
// 댓글 수정
export const updateNoticeComment = async (
  crewId: string | number,
  noticeId: string | number,
  commentId: string | number,
  content: string
) => {
  const url = `/crew/${crewId}/notice/${noticeId}/comment/${commentId}`;
  try {
    const { data } = await privateAPI.put(url, { content }, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    if (data?.resultType !== "SUCCESS") throw new Error(data?.error?.reason || "Comment update failed");
    return data.data;
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Comment update failed";
    throw new Error(reason);
  }
};

// 댓글 삭제
export const deleteNoticeComment = async (
  crewId: string | number,
  noticeId: string | number,
  commentId: string | number
) => {
  const url = `/crew/${crewId}/notice/${noticeId}/comment/${commentId}`;
  try {
    const { data } = await privateAPI.delete(url, {
      withCredentials: true,
    });
    if (data?.resultType !== "SUCCESS") throw new Error(data?.error?.reason || "Comment delete failed");
    return data;
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Comment delete failed";
    throw new Error(reason);
  }
};

export const updateNotice = async (
  crewId: string,
  noticeId: string,
  payload: {
    title: string;
    content: string;
    type?: 0 | 1;
    isRequired?: boolean;
  }
) => {
  const url = `/crew/${crewId}/notice/${noticeId}`;

  const body: any = {
    title: payload.title,
    content: payload.content,
    // API 스펙: type은 0(일반) 또는 1(필수) 필수
    type:
      typeof payload.type === "number"
        ? (payload.type === 1 ? 1 : 0)
        : payload.isRequired
        ? 1
        : 0,
  };

  try {
    const { data } = await privateAPI.put(url, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    const reason = err?.response?.data?.error?.reason || err?.message || "Update failed";
    throw new Error(reason);
  }
};