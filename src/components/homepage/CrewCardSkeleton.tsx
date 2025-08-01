import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CrewCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white p-[0.5rem] w-[27.625rem] ">
      {/* 이미지 자리 */}
      <Skeleton height={225} borderRadius={16} className="mb-[0.5rem]" />

      {/* 카테고리 뱃지 자리 */}
      <Skeleton width={80} height={24} borderRadius={50} className="mb-2" />

      {/* 이름 */}
      <Skeleton width="70%" height={30} className="mb-2" />

      {/* 설명 */}
      <Skeleton width="100%" height={14} className="mb-1" />
      <Skeleton width="90%" height={14} className="mb-2" />

      {/* 태그 자리 */}
      <div className="flex flex-wrap gap-[0.25rem]">
        <Skeleton width={60} height={20} borderRadius={50} />
        <Skeleton width={50} height={20} borderRadius={50} />
        <Skeleton width={40} height={20} borderRadius={50} />
      </div>
    </div>
  );
}
