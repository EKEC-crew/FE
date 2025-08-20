// src/apis/client.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

type FetchOpts = RequestInit & { retryOn401?: boolean };

export async function authorizedFetch(url: string, opts: FetchOpts = {}) {
  const { retryOn401 = true, ...init } = opts;

  // 절대/상대 경로 모두 지원
  const fullUrl = url.startsWith("http")
    ? url
    : `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;

  const headers = new Headers(init.headers || {});
  const token = localStorage.getItem("accessToken");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res = await fetch(fullUrl, {
    ...init,
    headers,
    mode: "cors",
    credentials: "include", // 🔴 핵심: 쿠키 동반
  });

  // 토큰 만료 → 자동 갱신
  if (res.status === 401 && retryOn401) {
    const refreshed = await refreshAccessToken(); // 실패시 throw
    if (refreshed) {
      headers.set("Authorization", `Bearer ${refreshed}`);
      res = await fetch(fullUrl, {
        ...init,
        headers,
        mode: "cors",
        credentials: "include",
        // 재귀 폭주 방지
        // @ts-expect-error
        retryOn401: false,
      });
    }
  }

  return res;
}

let refreshInflight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshInflight) {
    refreshInflight = (async () => {
      const res = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST", // 보통 POST. 서버 스펙에 맞추세요.
        credentials: "include", // 🔴 핵심: 쿠키 전송
        mode: "cors",
      });

      if (!res.ok) {
        // 세션 만료 → 서버에 로그아웃 요청
        try {
          await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include",
            mode: "cors",
          });
        } catch (e) {
          console.warn("로그아웃 요청 실패", e);
        }

        localStorage.removeItem("accessToken");
        refreshInflight = null;
        throw new Error("SESSION_EXPIRED");
      }

      const json = await res.json().catch(() => null);
      // 서버 응답 키에 맞춰서 파싱
      const newToken =
        json?.data?.accessToken ?? json?.accessToken ?? json?.token ?? null;

      if (newToken) {
        localStorage.setItem("accessToken", newToken);
      }
      refreshInflight = null;
      return newToken;
    })();
  }
  return refreshInflight;
}
