// notice.tsx  (다가오는 일정 전용)
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useScheduleList } from "../../hooks/schedule/useScheduleList"; // ← 필요 시 경로 조정

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const { crewId } = useParams<{ crewId: string }>();

  // 일정 목록 (첫 페이지 10개 로드)
  const { data, isLoading, error } = useScheduleList(crewId || "", 1, 10);
  const plans: Array<{
    id: number;
    type: number;       // 0: 정기, 1: 번개
    title: string;
    day: string;        // ISO date string
    isApplied?: boolean;
    likeCount?: number;
  }> = data?.data?.plans || [];

  // 날짜 유틸
  const startOfDay = (d: Date) => {
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  };
  const diffDays = (a: Date, b: Date) => {
    const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
    return Math.round(ms / (1000 * 60 * 60 * 24));
  };
  const fmtMD = (d: Date) => {
    const MM = String(d.getMonth() + 1).padStart(2, "0");
    const DD = String(d.getDate()).padStart(2, "0");
    return `${MM}/${DD}`;
  };

  // 오늘 이후(>= 오늘) 중 가장 가까운 일정 1개 선택 (없으면 가장 최근 과거 1개 대체)
  const upcoming = useMemo(() => {
    if (!plans.length) return null;

    const now = new Date();
    const future = plans
      .map((p) => ({ ...p, dateObj: new Date(p.day) }))
      .filter((p) => diffDays(p.dateObj, now) >= 0) // 오늘 이후
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    if (future.length > 0) return future[0];

    // 전부 과거면, 가장 가까운 과거(최신) 하나 선택
    const past = plans
      .map((p) => ({ ...p, dateObj: new Date(p.day) }))
      .filter((p) => diffDays(p.dateObj, now) < 0)
      .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

    return past[0] || null;
  }, [plans]);

  const handleClick = () => {
    // 개별 상세로 이동 (id가 있으면 상세, 없으면 목록)
    if (upcoming?.id) navigate(`/crew/${crewId}/schedule/${upcoming.id}`);
    else navigate(`/crew/${crewId}/schedule`);
  };

  // 로딩/에러/빈 상태 처리
  if (isLoading) {
    return (
      <div className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full">
        <span className="bg-blue-700 text-white text-sm px-3 py-1 rounded-full mr-2">
          다가오는 일정
        </span>
        <div className="flex-1 text-sm text-gray-500 truncate text-left ml-4">
          불러오는 중…
        </div>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md ml-3">
          ...
        </span>
      </div>
    );
  }

  if (error || !data || data.resultType === "FAIL" || !upcoming) {
    return (
      <div className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full">
        <span className="bg-blue-700 text-white text-sm px-3 py-1 rounded-full mr-2">
          다가오는 일정
        </span>
        <div className="flex-1 text-sm text-gray-500 truncate text-left ml-4">
          등록된 일정이 없습니다
        </div>
        <button
          onClick={() => navigate(`/crew/${crewId}/schedule`)}
          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md ml-3"
        >
          일정 보기
        </button>
      </div>
    );
  }

  // 표시값 계산
  const dateObj = new Date(upcoming.day);
  const today = new Date();
  const d = diffDays(dateObj, today); // 미래면 0,1,2… 과거면 음수
  const dBadge =
    d >= 0 ? `DAY-${d}` : `DAY+${Math.abs(d)}`; // 과거 표시도 유지하고 싶으면 이렇게, 싫으면 '종료'로 바꿔도 됨
  const md = fmtMD(dateObj); // MM/DD

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-white shadow-lg px-4 py-2 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label="다가오는 일정으로 이동"
    >
      {/* 왼쪽 파란 라벨 */}
      <span className="bg-[#3A3ADB] text-white text-sm px-3 py-1 rounded-full mr-2">
        다가오는 일정
      </span>

      {/* 가운데: [MM/DD] 제목 */}
      <div className="flex-1 text-sm text-gray-900 truncate text-left">
        <strong className="text-black ml-4 mr-1">[{md}]</strong>
        {upcoming.title}
      </div>

      {/* 오른쪽: DAY-N 뱃지 */}
      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md ml-3 whitespace-nowrap">
        {dBadge}
      </span>
    </div>
  );
};

export default Notice;
