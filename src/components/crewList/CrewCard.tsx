import bannerImg from "../../assets/crewList/Rectangle 4567.svg";
import starIcon from "../../assets/icons/ic_Star_36.svg";

const CrewCard = () => {
  return (
    <div className="flex items-center w-full max-w-[1320px] h-auto bg-white rounded-xl border-2 border-[#D9DADD] p-4">
      {/* 배너 이미지 */}
      <div className="relative w-1/3 aspect-[3/2] rounded-lg overflow-hidden min-w-[280px] max-w-[360px]">
        <img
          src={bannerImg}
          alt="사이클링히트"
          className="w-full h-full object-cover"
        />

        {/* 카테고리 태그 */}
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-[linear-gradient(135deg,#3A3ADB_0%,#3A3ADB_30%,#63BCEC_70%,#72EDF2_100%)] text-white text-xs sm:text-sm font-medium px-3 h-[26px] leading-[26px] rounded-full whitespace-nowrap">
            스포츠관람
          </span>
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col justify-between flex-1 pl-6 py-1">
        {/* 크루명, 소개 */}
        <div className="flex flex-col items-start text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#000000]">
            사이클링히트
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-medium text-[#5E6068] mt-1">
            잠실 2030 여성 야구 직관 동호회
          </p>
        </div>

        {/* 인원, 별점 */}
        <div className="flex items-center gap-4 mt-2">
          <span className="flex items-center text-sm sm:text-base md:text-xl font-normal bg-[#3A3ADB] text-white h-10 px-3 rounded-full">
            크루 45/50
          </span>
          <span className="text-sm sm:text-base md:text-xl font-normal text-[#1A1B1E] flex items-center gap-2">
            <img src={starIcon} alt="별점" />
            4.8
          </span>
        </div>

        {/* 활동 태그 */}
        <div className="flex flex-wrap gap-x-2 gap-y-1.5 mt-3">
          {["오프라인", "뒷풀이", "정기모임", "자유참석", "정보공유"].map(
            (tag, i) => (
              <span
                key={`activity-${i}`}
                className="bg-[#F7F7FB] text-[#5E6068] text-sm sm:text-base md:text-lg font-normal h-[29px] px-3 rounded-md flex items-center"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* 스타일 태그 */}
        <div className="flex flex-wrap gap-x-2 gap-y-1.5 mt-1">
          {["친목", "소통", "자유로운", "활발한", "장기참여"].map((tag, i) => (
            <span
              key={`style-${i}`}
              className="bg-[#F7F7FB] text-[#5E6068] text-sm sm:text-base md:text-lg font-normal h-[29px] px-3 rounded-md flex items-center"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
