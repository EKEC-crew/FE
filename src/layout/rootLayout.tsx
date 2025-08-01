// RootLayout.tsx

import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import LeftGnb from "../components/LeftGnb/LeftGnb";
import TopGnb from "../components/TopGnb/TopGnb";
import CompleteModal from "../components/auth/createProfile/completeModal";

const RootLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("showCompleteModal") === "true") {
      setShowCompleteModal(true);
      searchParams.delete("showCompleteModal");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleCloseModal = () => {
    setShowCompleteModal(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* 메인 레이아웃 */}
      <div className="flex transition-all duration-300">
        <LeftGnb />
        <TopGnb />
        <main className="md:ml-[18.75rem] flex-1">
          <Outlet />
        </main>
      </div>

      {/* 프로필 생성 완료 모달 */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 백드롭*/}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={handleCloseModal}
          />

          {/* 모달 */}
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
