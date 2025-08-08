// src/stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { refreshApi } from "../apis/auth";
import type { ResponseRefresh } from "../types/auth/types";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
type User = NonNullable<ResponseRefresh["data"]>;

interface AuthState {
  user: User | null;
  status: AuthStatus;
  setUser: (u: User | null) => void;
  setStatus: (s: AuthStatus) => void;
  initAuth: () => Promise<void>;
  forceLogout: () => void; // 401 등에서 즉시
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: "idle",
      setUser: (u) => set({ user: u }),
      setStatus: (s) => set({ status: s }),

      initAuth: async () => {
        set({ status: "loading" });
        try {
          const r = await refreshApi();
          if (r.resultType === "SUCCESS" && r.data) {
            set({ user: r.data, status: "authenticated" });
          } else {
            set({ user: null, status: "unauthenticated" });
          }
        } catch {
          set({ user: null, status: "unauthenticated" });
        }
      },

      forceLogout: () => set({ user: null, status: "unauthenticated" }),
    }),
    {
      name: "auth", // user/status만 저장
      partialize: (s) => ({ user: s.user, status: s.status }),
    }
  )
);
