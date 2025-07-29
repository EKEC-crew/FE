interface AuthBtnProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  hasLeftIcon?: boolean;
}

const AuthBtn: React.FC<AuthBtnProps> = ({
  disabled = false,
  children,
  onClick,
  type = "button",
  className = "",
  hasLeftIcon = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative flex items-center justify-center h-12 md:h-14 lg:h-16 w-full min-w-[280px] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 disabled:pointer-events-none ${className}`}
    >
      {disabled ? (
        // Disabled 상태 SVG
        <svg
          className="w-full h-full"
          viewBox="0 0 520 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect width="520" height="68" rx="10" fill="#93959D" />
        </svg>
      ) : (
        // Active 상태 SVG
        <svg
          className="w-full h-full"
          viewBox="0 0 520 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            width="520"
            height="68"
            rx="10"
            fill="url(#paint0_linear_1217_10504)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1217_10504"
              x1="32"
              y1="14"
              x2="61.3854"
              y2="118.719"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#72EDF2" />
              <stop offset="0.254808" stopColor="#63BCEC" />
              <stop offset="1" stopColor="#3A3ADB" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* 텍스트 오버레이 */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-white text-xl md:text-lg font-semibold pointer-events-none ${hasLeftIcon ? "pl-12" : ""}`}
      >
        {children}
      </div>
    </button>
  );
};

export default AuthBtn;
