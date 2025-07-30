interface GradientButtonBgProps {
  width?: number; // 버튼 width (기본 90)
  height?: number; // 버튼 height (기본 26)
  text?: string; // 버튼 안에 들어갈 텍스트
  className?: string;
}

const CategoryGradientButtonBg: React.FC<GradientButtonBgProps> = ({
  width = 90,
  height = 26,
  text = "",
  className = "",
}) => {
  const borderRadius = height / 2;

  // width별 비율 맵핑
  const gradientMap: Record<
    number,
    { x1: string; y1: string; x2: string; y2: string }
  > = {
    48: { x1: "45%", y1: "10.9%", x2: "82%", y2: "109.9%" }, // 수정됨
    62: { x1: "37.5%", y1: "10.9%", x2: "66.4%", y2: "126.4%" },
    76: { x1: "37.5%", y1: "10.9%", x2: "58.5%", y2: "137.5%" },
    81: { x1: "37.5%", y1: "10.9%", x2: "56.5%", y2: "140.5%" },
    90: { x1: "37.5%", y1: "10.9%", x2: "53.4%", y2: "144%" },
  };

  const coords = gradientMap[width] || gradientMap[90]; // 없으면 90 기준으로 fallback

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 버튼 배경 */}
      <rect
        width={width}
        height={height}
        rx={borderRadius}
        fill="url(#paint0_linear_gradient)"
      />
      {/* 텍스트 */}
      {text && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="16"
          fontWeight="500"
        >
          {text}
        </text>
      )}
      {/* 그라데이션 정의 */}
      <defs>
        <linearGradient
          id="paint0_linear_gradient"
          x1={coords.x1}
          y1={coords.y1}
          x2={coords.x2}
          y2={coords.y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#3A3ADB" />
          <stop offset={width === 48 ? "60%" : "72.6%"} stopColor="#63BCEC" />
          <stop offset="100%" stopColor="#72EDF2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CategoryGradientButtonBg;
