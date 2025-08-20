import { Outlet } from "react-router-dom";
import MyPageSidebar from "../../components/myPage/SidebarLayout";

export default function MyPageLayout() {
  return (
    <div className="px-6 py-8 pt-[6rem] pl-[3rem]">
      {/* 상단 제목 */}
      <h1 className="text-[2.25rem] font-bold text-black mb-3">마이페이지</h1>

      {/*본문: 사이드바 + 콘텐츠 */}
      <div className="flex gap-x-8">
        <MyPageSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
