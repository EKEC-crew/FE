// hooks/useNavigation.ts
import { useState, useEffect } from "react";

export const useNavigation = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isLeftGnbOpen, setIsLeftGnbOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 768;
      setIsLargeScreen(isLarge);

      if (isLarge) {
        setIsLeftGnbOpen(true);
      } else {
        setIsLeftGnbOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleLeftGnb = () => {
    setIsLeftGnbOpen(!isLeftGnbOpen);
  };

  const closeLeftGnb = () => {
    setIsLeftGnbOpen(false);
  };

  return {
    isLargeScreen,
    isLeftGnbOpen,
    toggleLeftGnb,
    closeLeftGnb,
  };
};
