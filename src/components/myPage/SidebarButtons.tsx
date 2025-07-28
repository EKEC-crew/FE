import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import calender from "../../assets/icons/myPage/ic_CalendarCheck_36.svg";
import calenderCor from "../../assets/icons/myPage/CalendarCheck.svg";

import userGear from "../../assets/icons/myPage/ic_UserCircleGear_36.svg";
import userGearCol from "../../assets/icons/myPage/UserCircleGear.svg";

import userCheck from "../../assets/icons/myPage/ic_UserCircleCheck_36.svg";
import userCheckCol from "../../assets/icons/myPage/UserCircleCheck.svg";

import userPlus from "../../assets/icons/myPage/ic_UserCirclePlus_36.svg";
import userPlusCol from "../../assets/icons/myPage/UserCirclePlus.svg";

import alarm from "../../assets/icons/myPage/ic_alarm_36.svg";
import alarmCol from "../../assets/icons/myPage/alarm_36.svg";
//타입 정의
type MenuItem = {
  to: string;
  label: string;
  icon?: string;
  activeIcon?: string;
};

// 메뉴 배열
const menus: MenuItem[] = [
  {
    to: "/mypage",
    label: "다가오는 일정",
    icon: calender,
    activeIcon: calenderCor,
  },
  {
    to: "/mypage/edit-profile",
    label: "개인정보 변경",
    icon: userGear,
    activeIcon: userGearCol,
  },
  {
    to: "/mypage/applied-crews",
    label: "내가 지원한 크루",
    icon: userCheck,
    activeIcon: userCheckCol,
  },
  {
    to: "/mypage/created-crews",
    label: "내가 만든 크루",
    icon: userPlus,
    activeIcon: userPlusCol,
  },
  {
    to: "/mypage/my-alarm",
    label: "알림 설정",
    icon: alarm,
    activeIcon: alarmCol,
  },
];

export default function MyPageSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="space-y-3 flex flex-col items-center">
      {menus.map((menu) => {
        const isActive = pathname === menu.to;
        const isHovered = hovered === menu.to;

        const isHighlighted = isActive || isHovered;

        const bgClass = isHighlighted ? "bg-white" : "";
        const textClass = isHighlighted
          ? "text-[#3A3ADB]"
          : "text-[#5E6068] hover:text-[#3A3ADB]";
        const iconSrc = isHighlighted
          ? (menu.activeIcon ?? menu.icon)
          : menu.icon;

        return (
          <button
            key={menu.to}
            onClick={() => navigate(menu.to)}
            onMouseEnter={() => setHovered(menu.to)}
            onMouseLeave={() => setHovered(null)}
            className={`w-[18.75rem] h-[3.75rem] px-6 text-left rounded-lg font-medium flex items-center gap-x-3 transition-all duration-200 ${bgClass} ${textClass}`}
          >
            {menu.icon && (
              <img src={iconSrc} alt="" className="w-[2.25rem] h-[2.25rem]" />
            )}
            {menu.label}
          </button>
        );
      })}
    </nav>
  );
}
