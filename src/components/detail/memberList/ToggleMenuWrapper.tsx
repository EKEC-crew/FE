import { useEffect, useRef } from "react";
import ToggleMenu from "./ToggleMenu";

interface ToggleMenuWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
  isLeader: boolean;
  isManager: boolean;
  onKick: () => void;
  onRoleChange: () => void;
  onWarn: () => void;
}

export default function ToggleMenuWrapper({
  isOpen,
  onClose,
  role,
  isLeader,
  isManager,
  onKick,
  onRoleChange,
  onWarn,
}: ToggleMenuWrapperProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose(); // 외부 클릭 → 닫기
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef}>
      <ToggleMenu
        role={role}
        isLeader={isLeader}
        isManager={isManager}
        onClose={onClose}
        onKick={onKick}
        onRoleChange={onRoleChange}
        onWarn={onWarn}
      />
    </div>
  );
}
