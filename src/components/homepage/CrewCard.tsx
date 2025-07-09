import bennerLogo from "../../assets/logo/img_crew_banner.svg";
import btn48 from "../../assets/icons/homeCategory/btn_sol_de_co_48x26.svg";
import btn62 from "../../assets/icons/homeCategory/btn_sol_de_co_62x26.svg";
import btn76 from "../../assets/icons/homeCategory/btn_sol_de_co_76x26.svg";
import btn81 from "../../assets/icons/homeCategory/btn_sol_de_co_81x26.svg";
import btn90 from "../../assets/icons/homeCategory/btn_sol_de_co_90x26.svg";
import { useNavigate } from "react-router-dom";

const categoryBackgrounds: Record<string, string> = {
  사교: btn48,
  여행: btn48,
  음식: btn48,

  스터디: btn62,

  액티비티: btn76,
  자기계발: btn76,

  "운동/영상": btn81,
  "음악/악기": btn81,
  "문화/공연": btn81,
  "사진/영상": btn81,

  스포츠직관: btn90,
};

interface Crew {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
}
interface CrewCardProps {
  crew: Crew;
}
export default function CrewCard({ crew }: CrewCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/crew/${crew.id}`); // 예: /crew/3 으로 이동 추후에 서버 받으면 바뀔듯...!!!
  };
  return (
    <div
      className="rounded-xl overflow-hidden bg-white p-2 w-[442px] h-[347px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
             cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={crew.imageUrl ? crew.imageUrl : bennerLogo}
        alt={crew.name}
        className="w-[442px] h-[225px] object-cover rounded-lg mb-2"
      />
      <div className="relative w-fit h-[26px] mb-0">
        <img
          src={categoryBackgrounds[crew.category.trim()] ?? btn48}
          alt={crew.category}
          className="w-full h-full object-cover rounded-full"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-base">
          {crew.category}
        </span>
      </div>
      <div className="font-bold text-black text-xl">{crew.name}</div>
      <div className="text-sm text-gray-500">{crew.description}</div>
      <div className="flex flex-wrap gap-1 text-xs text-gray-400">
        {crew.tags.map((tag, i) => (
          <div className=" rounded-2xl px-1.5 py-0.5 bg-[#EFF0F4] " key={i}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
