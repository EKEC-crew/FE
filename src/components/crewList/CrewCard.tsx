// header.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DefaultCrewProfile from "/src/assets/header/ic_DefaultCrewProfile.png";
import defaultBanner from "/src/assets/logo/img_crew_banner.svg";
import ReviewStar from "/src/assets/header/ic_ReviewStar.png";
import UserCircle from "/src/assets/header/ic_UserCircle.svg";
import crown from "/src/assets/header/ic_crown.png";

/** ===== API 호출: .env(VITE_API_BASE_URL = https://api.ekec.site/api) 사용 ===== */
const fetchCrewInfo = async (crewId: string) => {
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const url = `${apiBase}/crew/${crewId}/info`;

  const res = await fetch(url, {
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
  const url = `${apiBase}/crew/${crewId}/my-role`;

  const res = await fetch(url, {
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

  const {
    data: crewInfo,
    isLoading: infoLoading,
    isError: infoError,
  } = useQuery({
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

  // 역할 라벨
  const roleLabel: Record<string, string> = {
    LEADER: "크루장",
    MANAGER: "운영진",
    MEMBER: "크루원",
    GUEST: "게스트",
  };
  const roleKey = (myRole ?? "GUEST").toString();
  const isLeader = roleKey === "LEADER" || roleKey === "SUB_LEADER";

  // 표시 텍스트
  const title =
    crewInfo?.title ??
    (infoError ? "크루 정보를 불러오지 못했습니다" : "로딩중…");
  const subTitle = crewInfo?.content ?? "";
  const category = crewInfo?.category ?? "";
  const score = typeof crewInfo?.score === "number" ? crewInfo!.score : 0;
  const memberCount = crewInfo?.memberCount ?? 0;
  const capacity = crewInfo?.crewCapacity ?? 0;

  /** 이미지 URL: 카드(CrewCard)와 동일한 /image 엔드포인트 사용
   *  - 배너(type=0), 프로필(type=1)
   *  - DB에는 파일명만 내려온다 (예: "profile1.jpg")
   */
  const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

  // 등록 여부 플래그
  const hasProfile = !!crewInfo?.profileImage?.trim();
  const hasBanner = !!crewInfo?.bannerImage?.trim();

  // 등록된 경우에만 실제 URL 사용, 없으면 기본 이미지
  const profileSrc = useMemo(() => {
    if (!hasProfile) return DefaultCrewProfile; // ❗ 등록 안 됐을 때만 기본 이미지
    const f = crewInfo!.profileImage!.trim();
    if (/^https?:\/\//i.test(f)) return f;
    return `${apiBase}/image/?type=1&fileName=${encodeURIComponent(f)}`;
  }, [hasProfile, crewInfo?.profileImage, apiBase]);

  const bannerSrc = useMemo(() => {
    if (!hasBanner) return defaultBanner; // ❗ 등록 안 됐을 때만 기본 배너
    const f = crewInfo!.bannerImage!.trim();
    if (/^https?:\/\//i.test(f)) return f;
    return `${apiBase}/image/?type=0&fileName=${encodeURIComponent(f)}`;
  }, [hasBanner, crewInfo?.bannerImage, apiBase]);

  return (
    <div className="bg-white w-full shadow-lg">
      <div className="w-full px-4 pt-4">
        {/* 상단 배너 */}
        <div className="w-full h-40 md:h-56 rounded-xl overflow-hidden mb-4">
          <img
            src={bannerSrc}
            alt="크루 배너"
            className="w-full h-full object-cover"
            // ❗ 배너도 '등록돼 있으면' 기본 배너로 바꾸지 않음
            onError={(e) => {
              if (!hasBanner) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultBanner;
              }
            }}
          />
        </div>
      </div>

      <div className="w-full px-4 pb-6 flex justify-between">
        {/* 좌측: 프로필 + 크루 정보 */}
        <div className="flex items-center gap-6">
          <img
            src={profileSrc}
            alt="크루 로고"
            className="w-16 h-16 rounded-lg object-cover"
            // ❗ 등록돼 있으면 에러가 나도 기본 이미지로 바꾸지 않음
            onError={(e) => {
              if (!hasProfile) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DefaultCrewProfile;
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
                {roleLoading
                  ? "역할 확인중…"
                  : (roleLabel[roleKey] ?? "게스트")}
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

          {/* 크루장/운영진용 더보기 메뉴 */}
          {!roleLoading && isLeader && isMenuOpen && (
            <button
              onClick={() => navigate(`/crew/${crewId}/edit-intro`)}
              className="bg-gray-100 px-6 py-2 text-xs font-bold rounded-lg hover:bg-indigo-50 shadow-md transition-colors duration-200 text-left"
            >
              크루 소개 작성 및 수정하기
            </button>
          )}

          {/* 게스트용 지원하기 버튼 */}
          {!roleLoading && roleKey === "GUEST" && (
            <button
              onClick={() => {
                navigate(`/crew/${crewId}/apply`);
              }}
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
