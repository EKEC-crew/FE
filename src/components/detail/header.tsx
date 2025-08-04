import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultCrewProfile from "/src/assets/header/ic_DefaultCrewProfile.png";
import ReviewStar from "/src/assets/header/ic_ReviewStar.png";
import UserCircle from "/src/assets/header/ic_UserCircle.svg";
import crown from "/src/assets/header/ic_crown.png";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { crewId } = useParams();

  return (
    <div className="bg-white w-full shadow-lg">
      <div className="w-full px-4 py-6 flex justify-between">
        <div className="flex items-center gap-6">
          <img
            src={DefaultCrewProfile}
            className="w-16 h-16 rounded-lg object-cover"
            alt="로고"
          />
          <div>
            <div className="text-xl font-bold text-gray-900 text-left">
              사이클링히트
            </div>
            <p className="text-sm text-gray-500 text-left">
              잠실 2030 여성 야구 직관 동호회
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg">
                스포츠관람
              </span>

              {/* 버튼으로 수정 -> 클릭 시 이동 */}
              <button
                onClick={() => navigate(`/crew/${crewId}/crewmemberlist`)}
                className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600 transition"
              >
                크루 45/50
              </button>

              <img
                src={ReviewStar}
                alt="별"
                className="w-6 h-6 rounded-full bg-white"
              />
              <span className="text-sm text-gray-700">4.8</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 relative">
          <div className="flex items-center justify-between w-full px-4 py-2">
            <img
              src={UserCircle}
              alt="프로필"
              className="w-6 h-6 rounded-full bg-white"
            />
            <div className="flex items-center gap-1 px-2">
              <img src={crown} alt="왕관" className="w-4 h-4" />
              <span className="text-sm">000님</span>
            </div>

            <button
              className="text-gray-500 text-xl leading-none"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              ⋮
            </button>
          </div>

          {isMenuOpen && (
            <button className="bg-gray-100 px-6 py-1 text-xs font-bold rounded-lg hover:bg-indigo-50 shadow-md transition-colors duration-200 text-left">
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
