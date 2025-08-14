import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultCrewProfile from "/src/assets/header/ic_DefaultCrewProfile.png";
import ReviewStar from "/src/assets/header/ic_ReviewStar.png";
import UserCircle from "/src/assets/header/ic_UserCircle.svg";
import crown from "/src/assets/header/ic_crown.png";
import { useQuery } from "@tanstack/react-query";
import { fetchCrewInfo, fetchMyRole } from "./constants";
import { getImageUrl } from "../../apis/bulletins";

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
  const subTitle = crewInfo?.content ?? "";
  const category = crewInfo?.category ?? "";
  const score = typeof crewInfo?.score === "number" ? crewInfo!.score : 0;
  const memberCount = crewInfo?.memberCount ?? 0;
  const capacity = crewInfo?.crewCapacity ?? 0;
  const profileSrc =
    getImageUrl(crewInfo?.profileImage, 1) || DefaultCrewProfile;

  return (
    <div className="bg-white w-full shadow-lg">
      <div className="w-full px-4 py-6 flex justify-between">
        {/* 좌측: 프로필 + 크루 정보 */}
        <div className="flex items-center gap-6">
          <img
            src={profileSrc}
            onError={(e) => {
              e.currentTarget.src = DefaultCrewProfile;
            }}
            className="w-16 h-16 rounded-lg object-cover"
            alt="크루 로고"
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

        {/* 우측: 내 역할 + 더보기 */}
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

          {!roleLoading && isLeader && isMenuOpen && (
            <button
              onClick={() => navigate(`/crew/${crewId}/edit-intro`)}
              className="bg-gray-100 px-6 py-2 text-xs font-bold rounded-lg hover:bg-indigo-50 shadow-md transition-colors duration-200 text-left"
            >
              크루 소개 작성 및 수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
