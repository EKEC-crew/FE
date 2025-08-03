import { useLocation, useNavigate } from "react-router-dom";

const tabItems = [
  {
    name: "소개",
    path: "/detail",
    include: ["/detail", "/detail/crewmemberlist", "/detail/applicants"],
  },
  { name: "일정", path: "/detail/schedule" },
  { name: "리뷰", path: "/detail/review" },
  { name: "앨범", path: "/detail/album" },
  { name: "게시판", path: "/detail/bulletin" },
];

function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-white w-full border-b border-gray-200">
      <div className="w-full px-4 flex justify-between">
        {tabItems.map(({ name, path, include }) => {
          // include 배열이 있으면 정확히 일치하는지 확인
          const isActive = include
            ? include.some((url) => location.pathname === url)
            : location.pathname === path ||
              location.pathname.startsWith(path + "/");

          return (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={`relative flex-1 text-center py-3 text-sm font-bold transition-colors duration-200
                ${isActive ? "text-[#373EE7]" : "text-[#A1A1A1]"}`}
            >
              {name}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#373EE7]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
