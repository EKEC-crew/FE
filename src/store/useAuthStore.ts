import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi, refreshApi } from "../apis/auth";
import type { ResponseRefresh } from "../types/auth/types";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
type User = NonNullable<ResponseRefresh["data"]>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface AuthState {
  user: User | null;
  status: AuthStatus;
  avatarUrl: string | null;
  setUser: (u: User | null) => void;
  setStatus: (s: AuthStatus) => void;
  initAuth: () => Promise<void>;
  forceLogout: () => void; // 401 등에서 즉시
  loadAvatar: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      status: "idle",
      setUser: (u) => set({ user: u }),
      setStatus: (s) => set({ status: s }),
      avatarUrl: null,

      initAuth: async () => {
        set({ status: "loading" });
        try {
          const r = await refreshApi();
          if (r.resultType === "SUCCESS" && r.data) {
            set({ user: r.data, status: "authenticated" });
            await get().loadAvatar(); // ✅ 로그인 상태라면 아바타 로딩
          } else {
            // 로그인 아님
            // 기존 ObjectURL 정리
            const prev = get().avatarUrl;
            if (prev) URL.revokeObjectURL(prev);
            set({ user: null, status: "unauthenticated", avatarUrl: null });
          }
        } catch {
          const prev = get().avatarUrl;
          if (prev) URL.revokeObjectURL(prev);
          set({ user: null, status: "unauthenticated", avatarUrl: null });
        }
      },

      forceLogout: () => set({ user: null, status: "unauthenticated" }),
      loadAvatar: async () => {
        const fileName = get().user?.profileImage;
        // 파일명 없으면 기본 이미지 쓰도록 null로 둠(컴포넌트에서 fallback)
        if (!fileName || !fileName.trim()) {
          const prev = get().avatarUrl;
          if (prev) URL.revokeObjectURL(prev);
          set({ avatarUrl: null });
          return;
        }

        // 이미지 API를 blob으로 호출
        const res = await authApi.get(`${API_BASE_URL}/image`, {
          params: { type: 1, fileName },
          responseType: "blob",
          withCredentials: true, // 쿠키 인증 필요 시
        });

        const blob = res.data as Blob;
        const objectUrl = URL.createObjectURL(blob);

        // 이전 URL 정리 후 새로 설정
        const prev = get().avatarUrl;
        if (prev) URL.revokeObjectURL(prev);
        set({ avatarUrl: objectUrl });
      },
    }),
    {
      name: "auth", // user/status만 저장
      partialize: (s) => ({ user: s.user, status: s.status }),
    }
  )
);
