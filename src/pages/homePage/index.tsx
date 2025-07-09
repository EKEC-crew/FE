import SearchBar from "../../components/TopGnb/SearchBar";
import homepageLogo from "../../assets/logo/ic_logo graphic_45.svg";
import SearchCategory from "../../components/homepage/SearchCategory";

import HomeCrewSection from "../../components/homepage/HomeCrewSection";
import HomeBackground from "../../components/homepage/HomeBackGround";
const Main = () => {
  return (
    <div className="relative overflow-hidden">
      {/*그라데이션 레이어드!! */}
      <HomeBackground />

      {/* 실제 콘텐츠 */}
      <div className="z-10 relative">
        <div className="flex flex-col items-center space-y-10 px-4">
          <div className="w-full max-w-[800px] flex flex-col items-center mt-[100px] space-y-10">
            <div className="flex items-center gap-[20px] mb-2">
              <img
                src={homepageLogo}
                alt="홈페이지 로고"
                className="h-[45px] object-contain"
              />
              <div className="text-3xl font-bold leading-none tracking-wide">
                누구나 쉽게 활발한 커뮤니티를 즐기는 곳
              </div>
            </div>
            <SearchBar variant="large" />
          </div>
          <SearchCategory />
          <HomeCrewSection />
        </div>
      </div>
    </div>
  );
};

export default Main;
