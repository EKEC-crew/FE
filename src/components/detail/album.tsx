import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ChevronRight } from "lucide-react";
import { fetchAlbumList, uploadAlbumImage } from "../../apis/album";
import { fetchMyRole as fetchMyRoleDetail } from "./constants";
import { useEffect, useRef, useState } from "react";
import crewBanner from "../../assets/logo/img_crew_banner.svg";

const Album: React.FC = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { crewId } = useParams();
  const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
  const imageBase = base.replace(/\/api$/, "");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["album", crewId],
    queryFn: () => fetchAlbumList(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60,
  });

  // 업로드 권한
  const { data: myRole } = useQuery({
    queryKey: ["myRole", crewId],
    queryFn: () => fetchMyRoleDetail(crewId!),
    enabled: !!crewId,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
  const canUpload = myRole === "LEADER" || myRole === "MANAGER";

  const { mutate: upload, isPending } = useMutation({
    mutationFn: (file: File) => uploadAlbumImage(crewId!, file),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["album", crewId] });
    },
    onError: (e: any) => alert(e?.message || "업로드 실패"),
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);

  // slotIndex -> objectURL
  const [previews, setPreviews] = useState<Record<number, string>>({});

  // ObjectURL 정리
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    // 같은 파일 다시 고를 수 있도록 초기화
    e.currentTarget.value = "";

    if (!f || targetSlot == null) return;

    // 간단한 클라이언트 검증(선택)
    if (!f.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있어요.");
      return;
    }

    // 이전 URL 정리 후, 새 URL 등록
    setPreviews((prev) => {
      const prevUrl = prev[targetSlot];
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return { ...prev, [targetSlot]: URL.createObjectURL(f) };
    });

    // 업로드
    upload(f);
  };

  // 고정 슬롯: 1행 배너+배너+보라, 2행 하늘색+배너+배너
  const slots: Array<{ kind: "banner" | "square"; bg?: string }> = [
    { kind: "banner" },
    { kind: "banner" },
    { kind: "square", bg: "bg-[#3A3ADB]" },
    { kind: "square", bg: "bg-[#6EE7F0]" },
    { kind: "banner" },
    { kind: "banner" },
  ];

  // 헬퍼: 슬롯 렌더러
  const renderTile = (
    slot: { kind: "banner" | "square"; bg?: string },
    globalIdx: number
  ) => {
    const apiSrc =
      items[globalIdx]?.imageName
        ? `${imageBase}/image/?type=0&fileName=${encodeURIComponent(items[globalIdx].imageName)}`
        : "";
    const src = previews[globalIdx] || apiSrc;

    const isBanner = slot.kind === "banner";
    const baseCls = isBanner ? "aspect-[3/2]" : "aspect-square";
    const bg = slot.bg || "bg-indigo-50";

    const clickable = canUpload && !isPending;

    return (
      <div
        key={globalIdx}
        className={`group relative rounded-2xl overflow-hidden ${baseCls} ${bg} ${clickable ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => {
          if (!clickable) return;
          setTargetSlot(globalIdx);
          fileInputRef.current?.click();
        }}
        role={clickable ? "button" : undefined}
        aria-disabled={!clickable}
      >
        {/* 실제 이미지 */}
        {src ? (
          <img
            src={src}
            alt="앨범"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : slot.kind === "banner" ? (
          <img src={crewBanner} alt="배너" className="w-full h-full object-cover" />
        ) : (
          // 스퀘어 타일에서 이미지/배너가 없을 때 비어있는 자리 표현
          <div className="w-full h-full flex items-center justify-center text-white/90 font-semibold">
            +
          </div>
        )}

        {/* 업로드 가능 시 오버레이 힌트 */}
        {clickable && (
          <div className="pointer-events-none absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30">
            <span className="text-white text-sm font-semibold">이미지 선택</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="w-full">
      {/* 1행: 정보카드(1열) + 썸네일 3개(2-4열) = 총 4열 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-3">
        {/* 좌측 정보 카드 (1열) */}
        <div className="bg-white rounded-2xl p-9 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">크루 활동 미리보기</h3>
            <h4 className="text-xl font-bold text-gray-900">앨범</h4>
            <p className="text-sm text-gray-500">크루원의 활동 사진으로 활동 맛보기</p>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <button
              onClick={() => navigate(`/crew/${crewId}/album`)}
              className="inline-flex items-center gap-2 py-1.5 px-7 rounded-xl bg-[#373EE7] text-white text-sm font-semibold hover:opacity-90"
            >
              전체보기
            </button>
          </div>
        </div>

        {/* 1행 썸네일 3개 (2-4열) */}
        {isLoading ? (
          <div className="lg:col-span-3 text-center text-gray-500 py-12">로딩중…</div>
        ) : !isLoading && items.length === 0 && Object.keys(previews).length === 0 ? (
          <div className="lg:col-span-3 text-center text-gray-400 py-12">
            아직 등록된 사진이 없습니다.
          </div>
        ) : (
          <>
            {slots.slice(0, 3).map((slot, i) => (
              <div key={i}>{renderTile(slot, i)}</div>
            ))}
          </>
        )}
      </div>

      {/* 2행: 썸네일 3개 = 총 3열 */}
      {!isLoading && (items.length > 0 || Object.keys(previews).length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {slots.slice(3).map((slot, i) => (
            <div key={i + 3}>{renderTile(slot, i + 3)}</div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPick}
        disabled={isPending}
      />
    </section>
  );
};

export default Album;
