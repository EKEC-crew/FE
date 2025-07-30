import AppliedCrewList from "../../components/myPage/applied/AppliedCrewList";
import type { AppliedCrew } from "../../types/mypage/AppliedCrew";

import { useState, useEffect } from "react";

const AppliedCrewPage = () => {
  const [appliedCrews, setAppliedCrews] = useState<AppliedCrew[]>([]);

  useEffect(() => {
    // 나중에 API 연결할듯...!
    setAppliedCrews([
      // 더미데이터 연결이유
      {
        id: 1,
        name: "드로잉 클럽",
        description: "20,30대 누구나 참여하는 간단한 드로잉",
        imageUrl: "",
        status: "미승인",
      },
      {
        id: 2,
        name: "사이클링히트",
        description: "잠실 2030 여성 야구 직관 동호회",
        imageUrl: "/images/crew2.png",
        status: "크루원",
      },
    ]);
  }, []);

  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-5">내가 지원한 크루</div>
      <AppliedCrewList crews={appliedCrews} />
    </div>
  );
};

export default AppliedCrewPage;
