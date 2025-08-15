import { useEffect, useState } from "react";

export default function useCompactVisibility(
  variant: "large" | "compact",
  pathname: string
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isHome = pathname === "/";

    if (variant === "compact") {
      if (!isHome) {
        setVisible(true);
        return;
      }
      const onScroll = () => {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        setVisible(y > 200);
      };
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    // large 모드
    setVisible(true);
  }, [variant, pathname]);

  return visible;
}
