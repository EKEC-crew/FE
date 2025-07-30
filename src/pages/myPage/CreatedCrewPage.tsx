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
        max: 50, // 정원 꽉참
      },
      {
        id: 2,
        name: "드로잉 클럽",
        description: "20,30대 누구나 참여하는 간단한 드로잉",
        imageUrl: "",
        category: "사교",
        current: 20,
        max: 30, // 여유 있는 크루
      },
      {
        id: 3,
        name: "러닝 크루",
        description: "매주 토요일 아침 러닝 모임",
        imageUrl: "/images/crew2.png",
        category: "운동/영상",
        current: 5,
        max: 10, // 소규모 크루
      },
      {
        id: 4,
        name: "독서 모임",
        description: "매달 한 권씩 함께 읽는 독서 모임",
        imageUrl: "/images/crew3.png",
        category: "문화/공연",
        current: 12,
        max: 15,
      },
      {
        id: 5,
        name: "보드게임 동호회",
        description: "보드게임 카페 정기 모임",
        imageUrl: "",
        category: "사교",
        current: 30,
        max: 50,
      },
      {
        id: 6,
        name: "캠핑 크루",
        description: "자연 속에서 힐링하는 캠핑 동호회",
        imageUrl: "/images/crew4.png",
        category: "여행",
        current: 8,
        max: 8, // 정원 꽉참
      },
      {
        id: 7,
        name: "댄스 스터디",
        description: "K-pop 안무 배우기",
        imageUrl: "/images/crew5.png",
        category: "자기계발",
        current: 2,
        max: 15,
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
