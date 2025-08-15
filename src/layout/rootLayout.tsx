import { Outlet } from "react-router-dom";
import LeftGnb from "../components/LeftGnb/LeftGnb";
import TopGnb from "../components/TopGnb/TopGnb";
import CompleteModal from "../components/auth/createProfile/completeModal";
import { useNavigation } from "../hooks/gnb/useNavigate";
import { useCompleteModal } from "../hooks/gnb/useCompleteModal";

const RootLayout = () => {
  // 네비게이션 관련 로직
  const { isLargeScreen, isLeftGnbOpen, toggleLeftGnb, closeLeftGnb } =
    useNavigation();

  // 완료 모달 관련 로직
  const { showCompleteModal, handleCloseModal } = useCompleteModal();

  return (
    <div className="relative min-h-screen">
      {/* 메인 레이아웃 */}
      <div className="flex transition-all duration-300">
        <LeftGnb
          isOpen={isLeftGnbOpen}
          isLargeScreen={isLargeScreen}
          onClose={closeLeftGnb}
        />
        <TopGnb
          onToggleNav={toggleLeftGnb}
          isNavOpen={isLeftGnbOpen}
          isLargeScreen={isLargeScreen}
        />
        <main
          className={`
            pt-4 flex-1 transition-all duration-300
            ${isLargeScreen && isLeftGnbOpen ? "ml-[18.75rem]" : "ml-0"}
          `}
        >
          <Outlet />
        </main>
      </div>

      {/* 프로필 생성 완료 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCloseModal}
          />
          <div
            className="relative w-full max-w-[560px] min-h-[552px] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <CompleteModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
