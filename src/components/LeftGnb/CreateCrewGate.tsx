import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const CREATE_PATH = "/crewCreatePage";
const LOGIN_PATH = "/signIn";

const CreateCrewGate = () => {
  const navigate = useNavigate();
  const status = useAuthStore((s) => s.status);
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    if (status === "idle") initAuth();
  }, [status, initAuth]);

  if (status === "idle" || status === "loading") return null;

  // 로그인 상태면 모달 없이 생성 페이지로
  if (status === "authenticated") {
    return <Navigate to={CREATE_PATH} replace />;
  }

  const onCancel = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/", { replace: true }); // 직접 진입 대비 폴백
  };

  const onConfirm = () =>
    navigate(`${LOGIN_PATH}?next=${encodeURIComponent(CREATE_PATH)}`, {
      replace: true,
    });

  return (
    <Modal onClose={onCancel} maxWidth="max-w-125" padding="p-6">
      <h3 className="text-2xl font-bold my-3">로그인이 필요합니다</h3>
      <p className="text-lg text-[#5E6068] mb-6">
        크루를 만들려면 로그인해 주세요
      </p>
      <div className="flex gap-3 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl bg-[#D9DADD] text-[#5E6068] text-[26px] font-semibold w-full py-2 rounded-lg cursor-pointer"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="px-4 rounded-xl bg-[#3A3ADB] text-white text-[26px] font-semibold w-full py-2 rounded-lg cursor-pointer"
        >
          로그인 하기
        </button>
      </div>
    </Modal>
  );
};

export default CreateCrewGate;
