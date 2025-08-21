const CrewCardSkeleton = () => {
  return (
    <div
      className="flex items-center w-full max-w-[1320px] h-auto bg-white rounded-xl border-2 border-[#D9DADD] p-4 animate-pulse"
      aria-hidden
    >
      {/* 배너 */}
      <div className="relative w-1/3 aspect-[3/2] rounded-lg overflow-hidden min-w-[280px] max-w-[360px]">
        <div className="w-full h-full bg-[#EDEEF2]" />
        {/* 카테고리 */}
        <div className="absolute top-3 left-3">
          <span className="inline-block h-7 rounded-full bg-[#E3E4EA] px-12" />
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col justify-between flex-1 pl-6 py-1 gap-1">
        {/* 크루명, 소개 */}
        <div className="flex flex-col items-start text-left">
          <div className="h-8 w-2/3 bg-[#EDEEF2] rounded mb-2" />
          <div className="h-5 w-5/6 bg-[#EDEEF2] rounded mt-1" />
        </div>

        {/* 인원, 별점 */}
        <div className="flex items-center gap-4 mt-2">
          <span className="h-10 w-36 rounded-full bg-[#E3E4EA]" />
          <span className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-[#EDEEF2]" />
            <div className="h-5 w-10 bg-[#EDEEF2] rounded" />
          </span>
        </div>

        {/* 활동 태그 */}
        <div className="flex flex-wrap gap-x-2 gap-y-1.5 mt-3">
          <span className="h-7 w-24 bg-[#F1F2F6] rounded-md" />
          <span className="h-7 w-20 bg-[#F1F2F6] rounded-md" />
          <span className="h-7 w-28 bg-[#F1F2F6] rounded-md" />
          <span className="h-7 w-16 bg-[#F1F2F6] rounded-md" />
        </div>

        {/* 스타일 태그*/}
        <div className="flex flex-wrap gap-x-2 gap-y-1.5 mt-1">
          <span className="h-7 w-24 bg-[#F1F2F6] rounded-md" />
          <span className="h-7 w-20 bg-[#F1F2F6] rounded-md" />
          <span className="h-7 w-16 bg-[#F1F2F6] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CrewCardSkeleton;
