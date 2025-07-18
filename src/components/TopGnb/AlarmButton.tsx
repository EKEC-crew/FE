import { useState, useRef, useEffect } from "react";
import AlarmDropDown from "./AlarmDropDown";
import noAlarm from "../../assets/icons/ic_alarm_40.svg";
import newAlarm from "../../assets/icons/ic_alarm_new_40.svg";
//더미데이터
const dummyAlarms = [
  {
    id: 1,
    crewName: "EKEC 크루",
    content: "크루 가입 신청이 도착했어요.",
    isRead: false,
    redirectUrl: "/crew/1/manage",
  },
  {
    id: 2,
    crewName: "디자인 크루",
    content: "내 글에 댓글이 달렸어요.",
    isRead: true,
    redirectUrl: "/crew/2/post/34",
  },
  {
    id: 3,
    crewName: "개발자 크루",
    content: "새 일정이 등록됐어요.",
    isRead: false,
    redirectUrl: "/crew/3/schedule",
  },
  {
    id: 4,
    crewName: "EKEC 크루",
    content: "크루 지원 결과가 나왔어요.",
    isRead: true,
    redirectUrl: "/crew/1/support",
  },
  {
    id: 5,
    crewName: "디자인 크루",
    content: "내 글이 좋아요를 받았어요.",
    isRead: false,
    redirectUrl: "/crew/2/post/12",
  },
];

export default function AlarmButton() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const unreadCount = dummyAlarms.filter((alarm) => !alarm.isRead).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <img
            src={unreadCount ? newAlarm : noAlarm}
            alt="알람 아이콘"
            className="w-9 h-9 object-contain align-middle"
            style={{ marginTop: "-2px" }}
          />
        </button>

        {unreadCount > 0 && (
          <span className=" bg-[#3A3ADB] text-white text-xs w-12 h-6 flex items-center justify-center rounded-2xl">
            알림{unreadCount}
          </span>
        )}
      </div>
      {open && <AlarmDropDown alarms={dummyAlarms} />}
    </div>
  );
}
