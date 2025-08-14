import { useNavigate, useParams } from "react-router-dom";
import iconHeart from "../../../assets/schedule/ic_Heart.svg";

interface Props {
  id?: number;
  type: "정기" | "번개";
  label?: string;
  title: string;
  date: string;
  status: number; // 0: 신청하기, 1: 신청완료
  isNew?: boolean;
  likeCount?: number;
}

const ScheduleItem = ({
  id,
  type,
  label,
  title,
  date,
  status,
  isNew,
  likeCount = 0,
}: Props) => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const handleClick = () => {
    navigate(`/crew/${crewId}/schedule/${id}`);
  };

  const getStatusText = () => {
    return status === 0 ? "신청하기" : "신청완료";
  };

  const getStatusStyle = () => {
    if (status === 1) {
      return "bg-[#D9DADD] text-[#5E6068]"; // 신청완료 상태
    }
    return "bg-[#3A3ADB] text-white"; // 신청하기 상태
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex items-center justify-between p-3 px-7 bg-[#F7F7FB] rounded-xl shadow-sm mb-2"
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-white px-1.5 py-0.5 rounded-full text-xs ${
            type === "정기" ? "bg-[#3A3ADB]" : "bg-[#72EDF2]"
          }`}
        >
          {type}
        </span>
        {label && (
          <span className="text-xs border border-gray-300 rounded px-1">
            {label}
          </span>
        )}
        <span className="font-semibold text-sm">{title}</span>
        {isNew && <span className="text-[#FF4949] text-xs">●</span>}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#93949D] text-sm whitespace-nowrap">{date}</span>

        {/* 좋아요 수 표시 */}
        <div className="flex items-center gap-1">
          <img src={iconHeart} alt="좋아요" className="w-4 h-4 grayscale" />
          <span className="text-[#93949D] text-sm">{likeCount}</span>
        </div>

        <button
          className={`text-xs font-semibold px-2 py-1 rounded ${getStatusStyle()} cursor-pointer`}
        >
          {getStatusText()}
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
