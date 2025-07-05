import { Link } from "react-router-dom";

interface SocialSignInButtonProps {
  to: string;
  bgColor?: string;
  imgSrc: string;
  alt: string;
  text: string;
  border?: string;
}

const SocialSignInButton = ({
  to,
  bgColor,
  imgSrc,
  alt,
  text,
  border,
}: SocialSignInButtonProps) => {
  return (
    <Link
      to={to}
      className={`w-full relative flex items-center justify-center h-[56.22px] box-border rounded-lg font-medium hover:shadow-md active:shadow-inner active:transform active:translate-y-0.5 ${border || ""}`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <img src={imgSrc} alt={alt} className="absolute left-5" />
      <div className="w-full text-center justify-center text-black text-l font-medium font-['Pretendard']">
        {text}
      </div>
    </Link>
  );
};

export default SocialSignInButton;
