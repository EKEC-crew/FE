import { useNavigate } from "react-router-dom";
import AlarmButton from "./AlarmButton";

export default function UserMenu() {
  const navigate = useNavigate();
  const userProfile = "";
  return (
    <div className="flex items-center space-x-4">
      {/* 알림 아이콘 */}
      <AlarmButton />
      {/* 프로필 이미지 → 마이페이지 이동 */}
      <button
        onClick={() => navigate("/myPage")}
        className="flex items-center space-x-2"
      >
        {userProfile ? (
          <img
            src={userProfile}
            alt="프로필"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        )}
        <span className="text-sm font-medium">0000님</span>
      </button>
    </div>
  );
}
