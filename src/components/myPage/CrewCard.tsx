import logo from "../../assets/logo/ic_logo graphic_45.svg";
import { categoryBackgrounds } from "../../components/CategoryBackgrounds";

interface CrewCardProps {
  imageUrl?: string;
  category?: string;
  title: string;
  description: string;
  rightContent: React.ReactNode;
}

export default function CrewCard({
  imageUrl,
  category,
  title,
  description,
  rightContent,
}: CrewCardProps) {
  const hasImage = imageUrl && imageUrl.trim() !== "";

  // 카테고리 뱃지 이미지 가져오기
  const categoryBg = category ? categoryBackgrounds[category] : null;

  return (
    <div className="flex items-center justify-between w-[56rem] h-[10rem] bg-[#F7F7FB] rounded-2xl px-6">
      {/* 좌측 */}
      <div className="flex items-center">
        {/* 이미지 컨테이너 */}
        <div
          className={`w-[6.25rem] h-[6.25rem] rounded-full flex items-center justify-center overflow-hidden 
            ${hasImage ? "" : "bg-[#ECECFC]"}`}
        >
          {hasImage ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={logo}
              alt="기본 로고"
              className="w-[2.8125rem] h-[2.8125rem]"
            />
          )}
        </div>

        {/* 텍스트 */}
        <div className="ml-6">
          {/* 카테고리 뱃지 (이미지 + 글자 overlay) */}
          {category && categoryBg && (
            <div className="relative inline-block">
              <img src={categoryBg} alt={category} className="h-[26px]" />
              <span
                className="
                  absolute inset-0 flex items-center justify-center 
                  text-white text-sm font-medium
                "
              >
                {category}
              </span>
            </div>
          )}

          <div className="text-[1.5rem] font-semibold">{title}</div>
          <p className="text-[1.125rem] text-[#222222]">{description}</p>
        </div>
      </div>

      {/* 우측 */}
      {rightContent}
    </div>
  );
}
