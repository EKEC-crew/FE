import defaultProfile from "../../assets/logo/defaultProfileImg.svg";

interface ProfileImageProps {
  imageUrl?: string | null;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProfileImage = ({
  imageUrl,
  alt = "프로필",
  size = "sm",
  className = "",
}: ProfileImageProps) => {
  const profileSrc = imageUrl || defaultProfile;

  const sizeClasses = {
    sm: "w-6 h-6", // 24px (댓글용)
    md: "w-8 h-8", // 32px
    lg: "w-10 h-10", // 40px (게시글용)
  };

  return (
    <img
      src={profileSrc}
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      onError={(e) => {
        // 이미지 로드 실패 시 기본 이미지로 대체
        const target = e.target as HTMLImageElement;
        if (target.src !== defaultProfile) {
          target.onerror = null;
          target.src = defaultProfile;
        }
      }}
    />
  );
};

export default ProfileImage;
