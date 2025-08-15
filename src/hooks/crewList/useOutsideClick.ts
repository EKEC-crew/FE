import { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, ref]);
};
