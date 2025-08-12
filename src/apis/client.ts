const API_BASE = import.meta.env.VITE_API_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
});

async function refreshToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("refresh_failed");
  const json = await res.json();
  if (json?.accessToken) localStorage.setItem("accessToken", json.accessToken);
  return json;
}

export async function authorizedFetch(input: RequestInfo, init?: RequestInit) {
  let res = await fetch(input, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers || {}), ...authHeader() },
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      await refreshToken();
      res = await fetch(input, {
        ...init,
        headers: { Accept: "application/json", ...(init?.headers || {}), ...authHeader() },
        credentials: "include",
      });
    } catch {
      return res; // refresh 실패 -> 그대로 반환
    }
  }
  return res;
}
