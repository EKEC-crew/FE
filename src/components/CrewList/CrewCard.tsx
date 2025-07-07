import bannerImg from "../../assets/CrewList/Rectangle 4567.svg";
import starIcon from "../../assets/icons/ic_Star_36.svg";

const CrewCard = () => {
  return (
    <div className="flex items-center w-[1320px] h-[259px] bg-white rounded-xl border-[2px] border-[#D9DADD] p-[10px]">
      {/* 배너 이미지 */}
      <div className="relative w-[349px] h-[233px] rounded-lg overflow-hidden">
        <img
          src={bannerImg}
          alt="사이클링히트"
          className="w-full h-full object-cover"
        />

        {/* 카테고리 태그 */}
        <div className="absolute top-[12px] left-[12px]">
          <span className="inline-block bg-[linear-gradient(135deg,#3A3ADB_0%,#3A3ADB_30%,#63BCEC_70%,#72EDF2_100%)] text-white text-[14px] font-medium px-[12px] h-[26px] leading-[26px] rounded-full whitespace-nowrap">
            스포츠관람
          </span>
        </div>
      </div>

      {/* 오른쪽 내용 */}
      <div className="flex flex-col justify-between flex-1 pl-[24px] py-[4px]">
        {/* 크루명, 소개 */}
        <div className="flex flex-col items-start text-left">
          <h3 className="text-[36px] font-semibold text-[#000000]">
            사이클링히트
          </h3>
          <p className="text-[20px] font-medium text-[#5E6068] mt-[4px]">
            잠실 2030 여성 야구 직관 동호회
          </p>
        </div>

        {/* 인원, 별점 */}
        <div className="flex items-center gap-[16px] mt-[8px]">
          <span className="flex items-center text-[20px] font-normal bg-[#3A3ADB] text-[#FFFFFF] h-[40px] px-[12px] rounded-full">
            크루 45/50
          </span>
          <span className="text-[20px] font-normal text-[#1A1B1E] flex items-center gap-[6px]">
            <img src={starIcon} alt="별점" />
            4.8
          </span>
        </div>
        {/* 활동 태그 */}
        <div className="flex flex-wrap gap-x-[8px] gap-y-[6px] mt-[12px]">
          {["오프라인", "뒷풀이", "정기모임", "자유참석", "정보공유"].map(
            (tag, i) => (
              <span
                key={`activity-${i}`}
                className="bg-[#F7F7FB] text-[#5E6068] text-[18px] font-normal h-[29px] px-[12px] rounded-[6px] flex items-center"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* 스타일 태그 */}
        <div className="flex flex-wrap gap-x-[8px] gap-y-[6px] mt-[4px]">
          {["친목", "소통", "자유로운", "활발한", "장기참여"].map((tag, i) => (
            <span
              key={`style-${i}`}
              className="bg-[#F7F7FB] text-[#5E6068] text-[18px] font-normal h-[29px] px-[12px] rounded-[6px] flex items-center"
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
