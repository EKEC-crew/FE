import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ChevronRight } from "lucide-react";
import { fetchAlbumList, uploadAlbumImage, type AlbumListItem } from "../../apis/album";
import { fetchMyRole as fetchMyRoleDetail } from "./constants";
import { useRef, useState } from "react";
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
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (targetSlot != null) {
      const url = URL.createObjectURL(f);
      setPreviews((prev) => ({ ...prev, [targetSlot]: url }));
    }
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
    const apiSrc = items[globalIdx]?.imageName
      ? `${imageBase}/image/?type=0&fileName=${encodeURIComponent(
          items[globalIdx].imageName
        )}`
      : "";
    const src = previews[globalIdx] || apiSrc;
    const isBanner = slot.kind === "banner";
    const baseCls = isBanner ? "aspect-[3/2]" : "aspect-square";
    const bg = slot.bg || "bg-indigo-50";

    return (
      <div
        key={globalIdx}
        className={`relative rounded-2xl overflow-hidden ${baseCls} ${bg}`}
        onClick={() => {
          if (!canUpload) return;
          setTargetSlot(globalIdx);
          fileInputRef.current?.click();
        }}
        role={canUpload ? "button" : undefined}
      >
        {src ? (
          <img
            src={src}
            alt="앨범"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : slot.kind === "banner" ? (
          <img src={crewBanner} alt="배너" className="w-full h-full object-cover" />
        ) : null}
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
        ) : !isLoading && items.length === 0 ? (
          <div className="lg:col-span-3 text-center text-gray-400 py-12">아직 등록된 사진이 없습니다.</div>
        ) : (
          <>
            {slots.slice(0, 3).map((slot, i) => (
              <div key={i}>
                {renderTile(slot, i)}
              </div>
            ))}
          </>
        )}
      </div>

      {/* 2행: 썸네일 3개 = 총 3열 */}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {slots.slice(3).map((slot, i) => (
            <div key={i + 3}>
              {renderTile(slot, i + 3)}
            </div>
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