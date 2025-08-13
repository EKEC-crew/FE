import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/ic_logo graphic_45.svg";

interface ApplicantCardProps {
  name: string;
  date: string;
  onConfirm?: () => void;
  crewId: number;
  applyId: number;
}
export default function ApplicantCard({
  name,
  date,
  onConfirm,
  crewId,
  applyId,
}: ApplicantCardProps) {
  const navigate = useNavigate();

  // 특정 크루 특정 지원서로 이동
  const handleConfirm = () => {
    //  먼저 훅/로그 같은 부수효과 수행
    onConfirm?.();
    // 그리고 항상 이동
    navigate(`/crew/${crewId}/apply/${applyId}`);
  };
  return (
    <div className="flex justify-between items-center bg-[#F7F7FB] p-[1rem] rounded-xl w-[72.625rem] h-[10rem]">
      <div className="flex items-center gap-[0.75rem]">
        <div className="w-[6.25rem] h-[6.25rem] rounded-full bg-[#D8D8F8] flex items-center justify-center">
          <img
            src={logo}
            alt="기본 로고"
            className="w-[2.8125rem] h-[2.8125rem]"
          />
        </div>
        <div>
          <div className="font-semibold text-[1.5rem]">{name}</div>
          <div className="text-[1.125rem] text-[#222222]">지원 날짜 {date}</div>
        </div>
      </div>
      <button
        type="button"
        className="bg-[#3A3ADB] text-white px-[1rem] py-[0.5rem] rounded-lg w-[12.25rem] h-[3.5rem] text-xl font-semibold"
        onClick={handleConfirm}
      >
        확인하기
      </button>
    </div>
  );
}
