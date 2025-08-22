// album.tsx
import React, { useRef, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 프로젝트 경로에 맞게 import 경로만 조정
import {
  fetchAlbumList,
  uploadAlbumImage,
  type AlbumListItem,
} from "../../apis/album";
import { fetchMyRole } from "./constants";
import { getImageUrl } from "../../apis/bulletins"; // 내부에 imageUrlHelpers를 래핑한 함수
import albumDefault from "../../assets/logo/album_banner.png";
import blue from "../../assets/img/blue.png";
import mint from "../../assets/img/mint.png";

type MyRole = "LEADER" | "MANAGER" | "MEMBER" | "GUEST";

interface AlbumProps {
  crewId: number;
}

const Album: React.FC<AlbumProps> = ({ crewId }) => {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  // 운영진 여부
  const { data: role } = useQuery<MyRole>({
    queryKey: ["myRole", crewId],
    queryFn: () => fetchMyRole(crewId),
    enabled: !!crewId,
    staleTime: 60_000,
  });
  const isAdmin = role === "LEADER" || role === "MANAGER";

  // 앨범 목록
  const { data: albumList = [] } = useQuery<AlbumListItem[]>({
    queryKey: ["albumList", crewId],
    queryFn: () => fetchAlbumList(crewId),
    enabled: !!crewId,
  });

  // 업로드
  const { mutate: doUpload } = useMutation({
    mutationFn: async (file: File) => {
      setUploading(true);
      try {
        await uploadAlbumImage(crewId, file);
      } finally {
        setUploading(false);
      }
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["albumList", crewId] });
    },
  });

  const onClickAdd = () => fileRef.current?.click();
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) doUpload(f);
    e.currentTarget.value = "";
  };

  // 연보라 이미지 슬롯 4개 (A,B,C,D)
  const slots = useMemo<(AlbumListItem | undefined)[]>(
    () => [albumList[0], albumList[1], albumList[2], albumList[3]],
    [albumList]
  );

  /** 연보라 이미지 카드: 기본은 albumDefault, 서버 이미지가 있으면 대체
   *  - 디폴트(혹은 오류) 상태에서만: 운영진 = 클릭 업로드 / 비운영진 = 클릭 불가
   */
  const ImageCard: React.FC<{ item?: AlbumListItem }> = ({ item }) => {
    const [err, setErr] = useState(false);
    const url = item ? (getImageUrl(item.imageName, 3) ?? null) : null; // type=3 고정
    const showImg = !!url && !err;

    return (
      <div className="w-[230px] h-[230px] aspect-square rounded-xl bg-[#EEF0FF] overflow-hidden relative">
        {showImg ? (
          <img
            src={url!}
            alt={item ? `album ${item.albumId}` : "album"}
            className="w-full h-full object-cover"
            onError={() => setErr(true)}
          />
        ) : isAdmin ? (
          <button
            type="button"
            onClick={onClickAdd}
            disabled={uploading}
            className="w-full h-full hover:bg-[#F5F6FF] transition-colors disabled:opacity-60"
            aria-label="이미지 업로드"
            title="이미지 업로드"
          >
            <img
              src={albumDefault}
              alt="default album (click to upload)"
              className="w-full h-full object-contain p-6 select-none pointer-events-none"
              draggable={false}
            />
          </button>
        ) : (
          <img
            src={albumDefault}
            alt="default album"
            className="w-full h-full object-contain p-6 select-none pointer-events-none"
            draggable={false}
          />
        )}
      </div>
    );
  };

  /** 파란색 절반 카드 (오른쪽이 잘려서 안 보이는 느낌) */
  const BlueHalfCard = () => <img src={blue} alt="" />;

  /** 민트색 절반 카드 (왼쪽이 잘려서 안 보이는 느낌) */
  const MintHalfCard = () => <img src={mint} alt="" />;

  return (
    <section className="w-full">
      {/* 첫 번째 행: 텍스트 + 앨범들 */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_230px_230px_230px] gap-4 items-start mb-4">
        {/* 왼쪽 텍스트 (1열) */}
        <div>
          <h3 className="text-gray-900 text-xl font-semibold">
            크루 활동 미리보기
          </h3>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight">앨범</h2>
          <p className="mt-2 text-sm text-gray-600">
            크루원의 활동 사진으로 활동 엿보기
          </p>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#3A3ADB] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              aria-disabled="true"
            >
              전체보기 →
            </button>
          </div>
        </div>

        {/* 2열, 3열, 4열: 이미지1, 이미지2, 파란 박스 */}
        <ImageCard item={slots[0]} />
        <ImageCard item={slots[1]} />
        <BlueHalfCard />
      </div>

      {/* 두 번째 행: 민트 + 이미지3 + 이미지4 (AddCard 제거) */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_230px_230px_230px] gap-4">
        <MintHalfCard />
        <ImageCard item={slots[2]} />
        <ImageCard item={slots[3]} />
      </div>

      {/* hidden input */}
      {isAdmin && (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeFile}
        />
      )}
    </section>
  );
};

export default Album;
