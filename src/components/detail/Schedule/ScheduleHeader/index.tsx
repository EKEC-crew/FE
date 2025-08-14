import {
  getApplyButtonText,
  getApplyButtonStyle,
  formatScheduleDate,
} from "../../../../utils/scheduleUtils";
import ProfileImage from "../../../common/ProfileImage";

interface ScheduleHeaderProps {
  type: number;
  title: string;
  writer: string;
  writerImage?: string | null; // 작성자 프로필 이미지 추가
  day: string;
  isApplied: boolean;
  isPending: boolean;
  onApplyClick: () => void;
}

const ScheduleHeader = ({
  type,
  title,
  writer,
  writerImage,
  day,
  isApplied,
  isPending,
  onApplyClick,
}: ScheduleHeaderProps) => {
  return (
    <>
      {/* 제목 + 태그 */}
      <div className="flex items-center space-x-2">
        <span
          className={`text-white text-xs px-2 py-0.5 rounded-full ${
            type === 0 ? "bg-[#3A3ADB]" : "bg-[#72EDF2]"
          }`}
        >
          {type === 0 ? "정기" : "번개"}
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      {/* 작성자 정보 + 버튼 */}
      <div className="flex justify-between items-center">
        <div className="flex py-1 items-center gap-2">
          <ProfileImage
            imageUrl={writerImage}
            alt={`${writer} 프로필`}
            size="md"
          />
          <p className="text-sm text-gray-600">{writer}</p>
          <p className="text-sm text-gray-500">{formatScheduleDate(day)}</p>
        </div>
        <button
          onClick={onApplyClick}
          disabled={isApplied || isPending}
          className={`font-semibold px-5 py-1.5 rounded-xl text-sm ${getApplyButtonStyle(isApplied)} ${
            !isApplied ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {getApplyButtonText(isPending, isApplied)}
        </button>
      </div>
    </>
  );
};

export default ScheduleHeader;
