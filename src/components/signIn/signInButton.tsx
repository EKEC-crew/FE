import { Link } from "react-router-dom";

interface SignInButtonProps {
  to: string;
  bgColor?: string;
  imgSrc: string;
  alt: string;
  text: string;
  border?: string;
}

const SignInButton = ({
  to,
  bgColor,
  imgSrc,
  alt,
  text,
  border,
}: SignInButtonProps) => {
  return (
    <Link
      to={to}
      className={`w-full relative flex items-center px-4 py-3.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:shadow-inner active:transform active:translate-y-0.5 ${
        border || ""
      }`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <img src={imgSrc} alt={alt} className="absolute left-5" />
      <div className="w-full text-center justify-center text-black text-l font-medium font-['Pretendard']">
        {text}
      </div>
    </Link>
  );
};

export default SignInButton;
