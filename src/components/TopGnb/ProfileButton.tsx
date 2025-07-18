import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function ProfileButton() {
  const navigate = useNavigate();
  const userProfile = "";
  const [isOpen, setIsOpen] = useState(false);

  const handleMypage = () => {
    setIsOpen(false);
    navigate("/myPage");
  };
  const handleLogout = () => {
    setIsOpen(false);
    navigate("/signIn");
  };
  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={handleProfileClick}
        className="flex w-[9.06rem] h-12 items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-110"
      >
        {userProfile ? (
          <img
            src={userProfile}
            alt="프로필"
            className="w-[1.625rem] h-[1.625rem] rounded-full object-cover"
          />
        ) : (
          <div className="w-[1.625rem] h-[1.625rem] rounded-full bg-gray-300" />
        )}
        <span className="text-lg w-[5.44rem] h-[1.625rem] font-medium text-left flex-shrink-0">
          0000님
        </span>
      </button>
      {isOpen && (
        <ProfileModal
          onClose={() => setIsOpen(false)}
          onLogout={handleLogout}
          onMyPage={handleMypage}
        />
      )}
    </>
  );
}
