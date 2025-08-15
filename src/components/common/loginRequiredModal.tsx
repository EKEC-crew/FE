// src/components/common/LoginRequiredModal.tsx
import { useState, useEffect } from "react";
import Modal from "./Modal";
import modalImg from "../../assets/icons/img_graphic2_340.svg";

const LoginRequiredModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // ✅ 1) 이벤트 리스너
    const handleNeedLogin = () => {
      console.log("🎭 needLogin 이벤트 수신, 모달 표시");
      setShowModal(true);
    };

    // ✅ 2) URL 파라미터 체크 (페이지 로드 시)
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("needLogin") === "true") {
        console.log("🎭 URL 파라미터로 모달 표시");
        setShowModal(true);

        // URL에서 파라미터 제거 (깔끔하게)
        window.history.replaceState({}, "", "/");
      }
    };

    // 둘 다 등록
    window.addEventListener("needLogin", handleNeedLogin);
    checkUrlParams();

    return () => window.removeEventListener("needLogin", handleNeedLogin);
  }, []);

  const handleCancel = () => {
    console.log("🎭 취소 클릭");
    setShowModal(false);
  };

  const handleLogin = () => {
    console.log("🎭 로그인 클릭");
    setShowModal(false);
    window.location.href = "/signIn";
  };

  if (!showModal) return null;

  console.log("🎭 모달 표시!");

  return (
    <Modal onClose={handleCancel} maxWidth="max-w-125" padding="p-6">
      <div className="flex items-center justify-center">
        <img src={modalImg} className="h-[340px] w-[340px]" />
      </div>

      <h3 className="text-2xl font-bold my-3">로그인이 필요합니다</h3>
      <p className="text-lg text-[#5E6068] mb-6">
        이 기능을 사용하려면 로그인이 필요합니다
      </p>

      <div className="flex gap-3 w-full">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-xl bg-[#D9DADD] text-[#5E6068] text-[26px] font-semibold w-full py-2"
        >
          취소
        </button>

        <button
          type="button"
          onClick={handleLogin}
          className="rounded-xl bg-[#3A3ADB] text-white text-[26px] font-semibold w-full py-2"
        >
          로그인 하기
        </button>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
