import { useRef, useState, useEffect } from "react";
import CrewBanner from "../../assets/logo/img_crew_banner.svg";
import { useAuthStatus } from "../../hooks/notice/useAuthStatus";

function Album() {
  const { data: auth, isLoading } = useAuthStatus();
  const canUpload = !!auth?.isLoggedIn;
  
  // 디버깅용 로그
  console.log("Album - auth status:", { auth, canUpload, isLoading });

  const [preview, setPreview] = useState<Record<number, string>>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    return () => {
      Object.values(preview).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [preview]);

  const openPicker = (idx: number) => {
    if (!canUpload) {
      alert("로그인 후 이미지 첨부가 가능합니다.");
      return;
    }
    inputRefs.current[idx]?.click();
  };

  const onPick = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canUpload) return;
    const f = e.target.files?.[0];
    e.currentTarget.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("이미지 파일만 가능합니다.");
      return;
    }
    setPreview((prev) => {
      if (prev[idx]) URL.revokeObjectURL(prev[idx]);
      return { ...prev, [idx]: URL.createObjectURL(f) };
    });
  };

  const Badge = ({ text }: { text: string }) => (
    <span className="absolute -top-2 -left-2 rounded-lg bg-[#2F6BFF] text-white text-xs font-semibold px-2 py-1 shadow">
      {text}
    </span>
  );

  const Tile = ({
    idx,
    hasBanner = false,
    badge,
  }: {
    idx: number;
    hasBanner?: boolean;
    badge?: string;
  }) => {
    const src = preview[idx];
    return (
      <div className="relative w-full aspect-square rounded-xl bg-[#D9D9D9] overflow-hidden">
        {badge ? <Badge text={badge} /> : null}

        {/* 클릭 영역 */}
        <div
          className={`absolute inset-0 ${canUpload ? "cursor-pointer" : "cursor-not-allowed"}`}
          onClick={() => openPicker(idx)}
          role="button"
          aria-label={`tile-${idx}`}
          aria-disabled={!canUpload}
          title={canUpload ? "이미지 추가" : "로그인 후 이미지 첨부 가능"}
        >
          {src ? (
            <img src={src} alt="preview" className="w-full h-full object-cover" />
          ) : hasBanner ? (
            <img
              src={CrewBanner}
              alt="crew banner"
              className="w-full h-full object-cover transform scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 text-3xl leading-none">+</span>
            </div>
          )}
        </div>

        {/* 비로그인 오버레이 - 로딩 중이 아니고 로그인되지 않은 경우에만 표시 */}
        {!isLoading && !canUpload && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium select-none">
            로그인 후 첨부 가능
          </div>
        )}

        {/* 파일 입력 자체도 비활성화 */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          onChange={(e) => onPick(idx, e)}
          disabled={!canUpload} // ✅ 비로그인 비활성화
        />
      </div>
    );
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-4 px-4">앨범</h2>

      <div className="w-full rounded-2xl bg-[#F6F7FB] p-6 md:p-8 shadow-sm">
        <div
          className="
            grid w-full
            grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]
            gap-4 md:gap-6
          "
        >
          <Tile idx={0} hasBanner badge="6-1" />
          <Tile idx={1} />
          <Tile idx={2} />
        </div>
      </div>
    </section>
  );
}

export default Album;
