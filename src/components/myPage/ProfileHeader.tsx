import noProfileImage from "../../assets/icons/ic_logo graphic_74.svg";
import camera from "../../assets/icons/ic_line_Camera.svg";
import { useAuthStore } from "../../store/useAuthStore";
import { imageUrlHelpers } from "../../apis/image";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  const handleProfileClick = () => {
    alert("프로필 이미지 변경");
  };

  //이미지로드 가공
  const profileimageUrl = user?.profileImage
    ? imageUrlHelpers.profile(user.profileImage)
    : "";

  return (
    <div className="p-4 text-center">
      <div className="relative w-[10.625rem] h-[10.625rem] mx-auto mb-3">
        <button
          onClick={handleProfileClick}
          className="w-full h-full bg-[#ECECFC] rounded-full flex items-center justify-center overflow-hidden"
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
        </button>
        {/*카메라*/}
        <button
          onClick={handleProfileClick}
          className="absolute bottom-0 right-0 w-[3.125rem] h-[3.125rem] bg-[#3A3ADB] rounded-full flex justify-center items-center border-white border-[4px]"
        >
          <img src={camera} className="w-[1.75rem] h-[1.75rem]" />
        </button>
      </div>

      <div className="text-[38px] font-bold text-black">{user?.nickname}</div>
      <div className="text-[18px] text-gray-500">{user?.name}</div>
    </div>
  );
}
