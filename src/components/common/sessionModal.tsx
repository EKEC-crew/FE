import Modal from "./Modal";
import { useAuthStore } from "../../store/useAuthStore";

type Reason = "expired" | "revoked" | null;

export default function SessionModal() {
  const { showSessionModal, logoutReason, setSessionModal } = useAuthStore();
  const open = showSessionModal;
  const reason = logoutReason as Reason;

  if (!open) return null;

  const title =
    reason === "expired"
      ? "세션이 만료되었습니다"
      : "다른 기기에서 로그인되었습니다";
  const desc =
    reason === "expired"
      ? "보안을 위해 다시 로그인해 주세요."
      : "보안을 위해 현재 기기에서 로그아웃되었습니다. 다시 로그인해 주세요.";

  const close = () => {
    setSessionModal(false, null);
  };

  const goToLogin = () => {
    setSessionModal(false, null);
    window.location.href = "/signIn"; // navigate 대신 강제 리로드로 확실하게 처리
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-opacity-50"
      style={{ zIndex: 9999 }} // 다른 모든 모달보다 우선
    >
      <Modal onClose={close} maxWidth="max-w-[480px]" padding="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{desc}</p>
          <div className="flex justify-end gap-2 pt-2">
            <button className="rounded-xl px-4 py-2 border" onClick={close}>
              닫기
            </button>
            <button
              className="rounded-xl px-4 py-2 bg-black text-white"
              onClick={goToLogin}
            >
              로그인 페이지로
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
