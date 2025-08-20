const LS_KEYS = {
  lastRefreshSuccessAt: "auth:lastRefreshSuccessAt",
  lastLoginAt: "auth:lastLoginAt",
  authEver: "auth:ever",
} as const;

// 테스트용으로 짧게 설정
export const REFRESH_TTL_MS = 60 * 1000; // 1분
// 실제 환경에서는: 7 * 24 * 60 * 60 * 1000; // 7일

export const STARTUP_GRACE_MS = 2 * 60 * 1000; // 2분

function setItem(key: string, value: string | number) {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
}

function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function clearItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

export const authMeta = {
  // Refresh 성공 시각
  setLastRefreshSuccessAt: (ts: number) =>
    setItem(LS_KEYS.lastRefreshSuccessAt, ts),
  getLastRefreshSuccessAt: () => {
    const v = getItem(LS_KEYS.lastRefreshSuccessAt);
    return v ? Number(v) : null;
  },
  clearLastRefreshSuccessAt: () => clearItem(LS_KEYS.lastRefreshSuccessAt),

  // 로그인 시각
  setLastLoginAt: (ts: number) => setItem(LS_KEYS.lastLoginAt, ts),
  getLastLoginAt: () => {
    const v = getItem(LS_KEYS.lastLoginAt);
    return v ? Number(v) : null;
  },
  clearLastLoginAt: () => clearItem(LS_KEYS.lastLoginAt),

  // 로그인 기록 플래그
  setAuthEver: () => setItem(LS_KEYS.authEver, "1"),
  hasAuthEver: () => getItem(LS_KEYS.authEver) === "1",
  clearAuthEver: () => clearItem(LS_KEYS.authEver),

  // 전체 정리
  clearAll: () => {
    clearItem(LS_KEYS.lastRefreshSuccessAt);
    clearItem(LS_KEYS.lastLoginAt);
    clearItem(LS_KEYS.authEver);
  },
};
