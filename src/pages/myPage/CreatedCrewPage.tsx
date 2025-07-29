import { useState, useEffect } from "react";
import CreatedCrewList from "../../components/myPage/created/CreatedCrewList";
import type { CreatedCrew } from "../../types/mypage/CreateCrew";

export default function CreatedCrewPage() {
  const [createdCrews, setCreatedCrews] = useState<CreatedCrew[]>([]);

  useEffect(() => {
    // TODO: API 연동 (지금은 더미 데이터)
    setCreatedCrews([
      {
        id: 1,
        name: "사이클링히트",
        description: "잠실 2030 여성 야구 직관 동호회",
        imageUrl: "/images/crew1.png",
        category: "스포츠관람",
        current: 50,
        max: 50,
      },
      {
        id: 2,
        name: "드로잉 클럽",
        description: "20,30대 누구나 참여하는 간단한 드로잉",
        imageUrl: "",
        category: "미술/취미",
        current: 20,
        max: 30,
      },
    ]);
  }, []);

  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-5">내가 만든 크루</div>
      <CreatedCrewList crews={createdCrews} />
    </div>
  );
}
