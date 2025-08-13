interface BtnApplyProps {
  disabled?: boolean;
  className?: string;
}

const BtnApply = ({ disabled = false, className = "" }: BtnApplyProps) => {
  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 1101 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <rect
        width="1101"
        height="68"
        rx="10"
        fill={disabled ? "#93959D" : "url(#paint0_linear_btn_apply)"}
      />
      <defs>
        <linearGradient
          id="paint0_linear_btn_apply"
          x1="67.7538"
          y1="14"
          x2="82.4669"
          y2="125.015"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#72EDF2" />
          <stop offset="0.254808" stopColor="#63BCEC" />
          <stop offset="1" stopColor="#3A3ADB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BtnApply;
