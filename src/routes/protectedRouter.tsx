// src/router/ProtectedRoute.tsx
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import Modal from "../components/common/Modal";
import modalImg from "../assets/icons/img_graphic2_340.svg";
import Main from "../pages/homePage";

interface Props {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const status = useAuthStore((s) => s.status);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  /* 콜백 */
  const onCancel = () => {
    setOpen(false);
    navigate("/", { replace: true }); // 취소 시 홈으로 이동
  };

  const onConfirm = () => navigate("/signIn", { replace: true });

  /* 1) 아직 인증 여부를 모르는 상태 */
  if (status === "loading") return null;

  /* 2) 로그인 안 됐을 때 → 홈 배경 + 모달 */
  if (status !== "authenticated") {
    return (
      <>
        {open && (
          <Modal onClose={onCancel} maxWidth="max-w-125" padding="p-6">
            <div className="flex flex-col items-center justify-center">
              <img src={modalImg} className="h-[340px] w-[340px]" />

              <h3 className="text-2xl font-bold my-3">로그인이 필요합니다</h3>
              <p className="text-lg text-[#5E6068] mb-6">
                로그인 후 다시 시도해 주세요
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl bg-[#D9DADD] text-[#5E6068] text-[26px] font-semibold w-full py-2"
              >
                취소
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="rounded-xl bg-[#3A3ADB] text-white text-[26px] font-semibold w-full py-2"
              >
                로그인 하기
              </button>
            </div>
          </Modal>
        )}
        <Main /> {/* 홈 페이지를 배경으로 */}
      </>
    );
  }

  /* 3) 로그인 OK */
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
