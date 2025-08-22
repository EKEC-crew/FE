// header.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import defaultBanner from "/src/assets/logo/img_crew_banner.svg";
import ReviewStar from "/src/assets/header/ic_ReviewStar.png";
import UserCircle from "/src/assets/header/ic_UserCircle.svg";
import crown from "/src/assets/header/ic_crown.png";

/** API 호출 */
const fetchCrewInfo = async (crewId: string) => {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const res = await fetch(`${apiBase}/crew/${crewId}/info`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("크루 정보 조회 실패");
  const data = await res.json();
  if (data?.resultType === "SUCCESS" && data?.data) return data.data;
  throw new Error(data?.error?.reason || "크루 정보 조회 실패");
};

const fetchMyRole = async (crewId: string) => {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const res = await fetch(`${apiBase}/crew/${crewId}/my-role`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) return "GUEST";
  const data = await res.json();
  if (data?.resultType === "SUCCESS" && data?.data) return data.data;
  return "GUEST";
};

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { crewId } = useParams();

  const { data: crewInfo, isLoading: infoLoading, isError: infoError } = useQuery({
    queryKey: ["crewInfo", crewId],
    queryFn: () => fetchCrewInfo(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
  });

  const { data: myRole, isLoading: roleLoading } = useQuery({
    queryKey: ["myRole", crewId],
    queryFn: () => fetchMyRole(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const roleLabel: Record<string, string> = {
    LEADER: "크루장",
    MANAGER: "운영진",
    MEMBER: "크루원",
    GUEST: "게스트",
  };
  const roleKey = (myRole ?? "GUEST").toString();
  const isLeader = roleKey === "LEADER" || roleKey === "SUB_LEADER";

  const title =
    crewInfo?.title ??
    (infoError ? "크루 정보를 불러오지 못했습니다" : "로딩중…");
  const subTitle = crewInfo?.content ?? crewInfo?.introduction ?? "";
  const category = crewInfo?.category ?? "";
  const score = typeof crewInfo?.score === "number" ? crewInfo!.score : 0;
  const memberCount = crewInfo?.memberCount ?? 0;
  const capacity = crewInfo?.crewCapacity ?? 0;

  /** 배너만 사용 (썸네일 한 개만 표시) */
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const bannerSrc = useMemo(() => {
    const f = crewInfo?.bannerImage?.trim();
    if (!f) return defaultBanner;
    if (/^https?:\/\//i.test(f)) return f;
    return `${apiBase}/image/?type=0&fileName=${encodeURIComponent(f)}`;
  }, [crewInfo?.bannerImage, apiBase]);

  return (
    <div className="bg-white w-full shadow-lg">
      {/* 상단 정보 바 (왼쪽 썸네일 하나만) */}
      <div className="w-full px-4 py-6 flex justify-between">
        {/* 왼쪽: 배너 썸네일 + 텍스트 */}
        <div className="flex items-center gap-6">
          <img
            src={bannerSrc}
            alt="크루 배너"
            className="w-16 h-16 rounded-lg object-cover"
            onError={(e) => {
              if (e.currentTarget.src !== defaultBanner) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultBanner;
              }
            }}
          />
          <div>
            <div className="text-xl font-bold text-gray-900 text-left">
              {title}
            </div>
            <p className="text-sm text-gray-500 text-left">{subTitle}</p>
            <div className="flex items-center gap-2 mt-2">
              {category && (
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg">
                  {category}
                </span>
              )}
              <button
                onClick={() => navigate(`/crew/${crewId}/crewmemberlist`)}
                className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600 transition disabled:opacity-60"
                disabled={infoLoading}
              >
                크루 {memberCount}/{capacity}
              </button>
              <img
                src={ReviewStar}
                alt="별"
                className="w-6 h-6 rounded-full bg-white"
              />
              <span className="text-sm text-gray-700">{score.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* 우측: 내 역할 + 더보기/지원하기 */}
        <div className="flex flex-col items-center gap-2 relative">
          <div className="flex items-center justify-between w-full px-4 py-2">
            <img
              src={UserCircle}
              alt="내 프로필"
              className="w-6 h-6 rounded-full bg-white"
            />
            <div className="flex items-center gap-1 px-2">
              {!roleLoading && isLeader && (
                <img src={crown} alt="왕관" className="w-4 h-4" />
              )}
              <span className="text-sm">
                {roleLoading ? "역할 확인중…" : (roleLabel[roleKey] ?? "게스트")}
              </span>
            </div>

            {!roleLoading && isLeader && (
              <button
                className="text-gray-500 text-xl leading-none"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                disabled={infoLoading}
                aria-label="더보기"
              >
                ⋮
              </button>
            )}
          </div>

          {!roleLoading && isLeader && isMenuOpen && (
            <button
              onClick={() => navigate(`/crew/${crewId}/edit-intro`)}
              className="bg-gray-100 px-6 py-2 text-xs font-bold rounded-lg hover:bg-indigo-50 shadow-md transition-colors duration-200 text-left"
            >
              크루 소개 작성 및 수정하기
            </button>
          )}
          {!roleLoading && roleKey === "GUEST" && (
            <button
              onClick={() => navigate(`/crew/${crewId}/apply`)}
              className="bg-[#3A3ADB] text-white px-6 py-2 text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              지원하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
