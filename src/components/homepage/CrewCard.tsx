import bennerLogo from "../../assets/logo/img_crew_banner.svg";
import { useNavigate } from "react-router-dom";
import { categoryBackgrounds } from "../CategoryBackgrounds";

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
    navigate(`/crew/${crew.id}`);
  };

  // categoryBackgrounds 안전 처리
  const normalizeCategory = (category: string) =>
    category.trim().replace(/\s/g, "");

  const categoryBg =
    categoryBackgrounds[normalizeCategory(crew.category)] ??
    categoryBackgrounds["사교"]; // fallback

  return (
    <div
      className="rounded-xl overflow-hidden bg-white p-[0.5rem] w-[27.625rem] h-[21.6875rem] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={crew.imageUrl || bennerLogo}
        alt={crew.name}
        className="w-[27.625rem] h-[14.0625rem] object-cover rounded-lg mb-[0.5rem]"
      />

      {/* 카테고리 뱃지 */}
      <div className="relative w-fit h-[1.625rem] mb-0">
        <img
          src={categoryBg}
          alt={crew.category}
          className="w-full h-full object-cover rounded-full"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white text-[1rem]">
          {crew.category}
        </span>
      </div>

      <div className="font-bold text-black text-[1.25rem]">{crew.name}</div>
      <div className="text-[0.875rem] text-gray-500 line-clamp-2">
        {crew.description}
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-[0.25rem] text-[0.75rem] text-gray-400">
        {crew.tags.map((tag, i) => (
          <div
            key={i}
            className="rounded-2xl px-[0.375rem] py-[0.125rem] bg-[#EFF0F4] font-medium"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
