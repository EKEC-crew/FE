import CategoryBgImgs from "../CategoryBgImgs";
import logo from "../../assets/logo/ic_logo graphic_45.svg";

const Header = () => {
  const tabs = ["소개", "공지", "일정", "리뷰", "게시판"]; // 탭 목록

  return (
    <div className="flex flex-col w-full">
      {/* 상단 프로필 영역 */}
      <div className="flex items-center gap-[1rem] py-[1rem]">
        {/* 프로필 이미지(로고) */}
        <div className="w-[5rem] h-[5rem] bg-[#ECECFC] rounded-full flex items-center justify-center">
          <img src={logo} className="w-[1.625rem] h-[1.625rem]" />
        </div>
        {/* 크루명 */}
        <div className="text-[2.5rem] font-bold">정동열짱짱</div>
        {/* 카테고리 배경 아이콘 */}
        <CategoryBgImgs category="스터디" />
      </div>

      {/* 하단 탭 영역 */}
      <div className="border-b-[0.3125rem] border-[#D9D9D9]">
        <div className="flex justify-evenly items-center gap-[5rem] h-[3rem]">
          {tabs.map((tab) => (
            <div key={tab} className="text-center text-[1.5rem] text-[#93959D]">
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
