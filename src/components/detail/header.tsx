function Header() {
  return (
    <div className="w-full py-10">
      <div className="flex justify-between bg-white p-6 shadow-lg w-full">
        <div className="flex items-center gap-6">
          <img
            src="/DefaultCrewProfile.png"
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
              <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-lg">
                크루 45/50
              </span>
              <img
                src="/header/ReviewStar.png"
                alt="프로필"
                className="w-6 h-6 rounded-full bg-gray-300"
              />
              <span className="text-sm text-gray-700">4.8</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between w-full px-4 py-2">
            <img
              src="/profile.png"
              alt="프로필"
              className="w-6 h-6 rounded-full bg-gray-300"
            />

            <div className="flex items-center gap-1 px-2">
              <img src="/header/crown.png" alt="왕관" className="w-4 h-4" />
              <span className="text-sm">0000님</span>
            </div>

            <button className="text-gray-500 text-xl leading-none">⋮</button>
          </div>

          <button className="bg-gray-100 px-6 py-1 text-xs font-bold rounded-lg hover:bg-indigo-50 shadow-md transition-colors duration-200 text-left">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
