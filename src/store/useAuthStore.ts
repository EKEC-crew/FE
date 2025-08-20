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
  forceLogout: () => void;
  loadAvatar: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      status: "idle",
      avatarUrl: null,

      setUser: (u) => set({ user: u }),
      setStatus: (s) => set({ status: s }),

      initAuth: async () => {
        set({ status: "loading" });
        try {
          const r = await refreshApi();
          if (r.resultType === "SUCCESS" && r.data) {
            set({ user: r.data, status: "authenticated" });
            await get().loadAvatar();
          } else {
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

      forceLogout: () =>
        set({
          user: null,
          status: "unauthenticated",
        }),

      loadAvatar: async () => {
        const fileName = get().user?.profileImage;
        if (!fileName || !fileName.trim()) {
          const prev = get().avatarUrl;
          if (prev) URL.revokeObjectURL(prev);
          set({ avatarUrl: null });
          return;
        }

        const res = await authApi.get(`${API_BASE_URL}/image`, {
          params: { type: 1, fileName },
          responseType: "blob",
          withCredentials: true,
        });

        const blob = res.data as Blob;
        const objectUrl = URL.createObjectURL(blob);

        const prev = get().avatarUrl;
        if (prev) URL.revokeObjectURL(prev);
        set({ avatarUrl: objectUrl });
      },
    }),
    {
      name: "auth",
      partialize: (s) => ({
        user: s.user,
        status: s.status,
      }),
    }
  )
);
