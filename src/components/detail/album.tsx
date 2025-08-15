import { useRef, useState, useEffect } from "react";
import CrewBanner from "../../assets/logo/img_crew_banner.svg";

function Album() {
  // 타일별 미리보기 URL
  const [preview, setPreview] = useState<Record<number, string>>({});
  // 타일별 파일 인풋 ref
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    return () => {
      Object.values(preview).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [preview]);

  const openPicker = (idx: number) => inputRefs.current[idx]?.click();

  const onPick = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.currentTarget.value = ""; // 같은 파일 재선택 허용
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

  // 공용 타일
  const Tile = ({
    idx,
    hasBanner = false,
  }: {
    idx: number;
    hasBanner?: boolean;
  }) => {
    const src = preview[idx];

    return (
      <div
        className="relative rounded-xl bg-[#D9D9D9] overflow-hidden cursor-pointer w-full aspect-square flex items-center justify-center"
        onClick={() => openPicker(idx)}
        role="button"
        aria-label={`tile-${idx}`}
      >
        {src ? (
          <img src={src} alt="preview" className="w-full h-full object-cover" />
        ) : hasBanner ? (
          <img src={CrewBanner} alt="crew banner" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-3xl leading-none">+</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={(el) => {
            if (el) inputRefs.current[idx] = el;
          }}
          onChange={(e) => onPick(idx, e)}
        />
      </div>
    );
  };

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-4 p-3">앨범</h2>

      {/* 부모 컨테이너: 가로폭 제한 + 가운데 정렬 */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-[#F6F7FB] p-8">
        {/* 모바일 1열 → sm부터 3열 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 각 칸 중앙정렬 + sm부터 2/3 크기 */}
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3">
              <Tile idx={0} hasBanner />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3">
              <Tile idx={1} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3">
              <Tile idx={2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Album;
