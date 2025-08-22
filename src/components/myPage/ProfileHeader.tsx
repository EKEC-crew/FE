import { useRef, useState } from "react";
import noProfileImage from "../../assets/icons/ic_logo graphic_74.svg";
import camera from "../../assets/icons/ic_line_Camera.svg";
import { useAuthStore } from "../../store/useAuthStore";
import { imageUrlHelpers } from "../../apis/image";
import { privateAPI } from "../../apis/axios";
import Modal from "../common/Modal";
import yesIcon from "../../assets/icons/img_graphic2_340.svg";
import noIcon from "../../assets/icons/img_graphic3_340.svg";
export default function ProfileHeader() {
  const { user, setUser } = useAuthStore();
  console.log("🔍 ProfileHeader Debug:", {
    user: user,
    profileImage: user?.profileImage,
    fullUrl: user?.profileImage
      ? imageUrlHelpers.profile(user.profileImage)
      : null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일 유효성 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택할 수 있습니다.");
      return;
    }

    // 파일 크기 제한 (예: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setIsUploading(true);

    try {
      // 기존 사용자 정보로 폼데이터 생성
      const formData = new FormData();

      // 새 프로필 이미지 추가
      formData.append("profileImage", file);
      formData.append("defaultImage", "false");

      // 기존 사용자 정보 유지
      formData.append("name", user?.name || "");
      formData.append("nickname", user?.nickname || "");
      formData.append("gender", String(user?.gender || 0));
      formData.append("phone", user?.phone || "");

      // 생년월일 처리
      if (user?.birth) {
        const birthDate = user.birth.split("T")[0]; // "2002-01-27"
        const [year, month, day] = birthDate.split("-").map(Number);
        const birthdayObject = { year, month, day };
        formData.append("birthday", JSON.stringify(birthdayObject));
      }

      const response = await privateAPI.post("/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.resultType === "SUCCESS") {
        const updatedUser = response.data.data;

        // 받아온 image 필드를 기존 profileImage에 매핑
        if (updatedUser.image) {
          updatedUser.profileImage = updatedUser.image;
        }

        setUser(updatedUser);

        // 아바타 새로고침
        await useAuthStore.getState().loadAvatar();

        setShowSuccessModal(true);
      } else {
        throw new Error("업로드 실패");
      }
    } catch (error) {
      console.error("프로필 이미지 업로드 실패:", error);
      setShowErrorModal(true);
    } finally {
      setIsUploading(false);
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // 이미지로드 가공
  const profileimageUrl = user?.profileImage
    ? imageUrlHelpers.profile(user.profileImage)
    : "";

  return (
    <>
      <div className="p-4 text-center">
        <div className="relative w-[10.625rem] h-[10.625rem] mx-auto mb-3">
          <button
            onClick={handleProfileClick}
            disabled={isUploading}
            className="w-full h-full bg-[#ECECFC] rounded-full flex items-center justify-center overflow-hidden relative"
          >
            <img
              src={profileimageUrl ? profileimageUrl : noProfileImage}
              alt="프로필 이미지"
              className={
                profileimageUrl
                  ? "w-full h-full object-cover"
                  : "w-[4.625rem] h-[4.625rem]"
              }
            />

            {/* 업로드 중일 때 로딩 오버레이 */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </button>

          {/* 카메라 버튼 */}
          <button
            onClick={handleProfileClick}
            disabled={isUploading}
            className="absolute bottom-0 right-0 w-[3.125rem] h-[3.125rem] bg-[#3A3ADB] rounded-full flex justify-center items-center border-white border-[4px] disabled:opacity-50"
          >
            <img src={camera} className="w-[1.75rem] h-[1.75rem]" />
          </button>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        <div className="text-[38px] font-bold text-black">{user?.nickname}</div>
        <div className="text-[18px] text-gray-500">{user?.name}</div>

        {/* 업로드 중 메시지 */}
        {isUploading && (
          <div className="text-sm text-blue-500 mt-2">
            프로필 이미지 업로드 중...
          </div>
        )}
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <Modal
          onClose={() => setShowSuccessModal(false)}
          maxWidth="max-w-[600px]"
        >
          <div className="text-center flex flex-col justify-center items-center gap-2 mb-6">
            <img src={yesIcon} className="h-[21.25rem] w-[21.25rem]" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              업로드 완료
            </h2>
            <p className="text-gray-600">
              프로필 이미지가 성공적으로 변경되었습니다!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#3A3ADB] text-white py-3 px-4 rounded-lg font-medium"
            >
              확인
            </button>
          </div>
        </Modal>
      )}

      {/* 에러 모달 */}
      {showErrorModal && (
        <Modal
          onClose={() => setShowErrorModal(false)}
          maxWidth="max-w-[600px]"
        >
          <div className="text-center flex flex-col justify-center items-center gap-2 mb-6">
            <img src={noIcon} className="h-[21.25rem] w-[21.25rem]" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              업로드 실패
            </h2>
            <p className="text-gray-600">
              프로필 이미지 변경에 실패했습니다.
              <br />
              다시 시도해주세요.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-[#3A3ADB] text-white py-3 px-4 rounded-lg font-medium"
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
