import { createPortal } from "react-dom";
import AlarmItem from "./AlarmItem";
import { useNavigate } from "react-router-dom";

interface Alarm {
  id: number;
  crewName: string;
  content: string;
  isRead: boolean;
  redirectUrl: string;
}

interface Props {
  alarms: Alarm[];
}

export default function AlarmDropdown({ alarms }: Props) {
  const navigate = useNavigate();

  return createPortal(
    <div className="fixed top-[60px] right-[16px] w-[25rem] bg-[#F7F7FB] rounded-2xl shadow-md overflow-auto z-[9999]">
      <div className="p-4 font-bold mb-3 bg-white sticky top-0 z-10">알림</div>
      <ul
        className="max-h-80 overflow-y-scroll space-y-3"
        style={{ scrollbarWidth: "thin" }}
      >
        {alarms.map((alarm) => (
          <AlarmItem
            key={alarm.id}
            crewName={alarm.crewName}
            content={alarm.content}
            isRead={alarm.isRead}
            onClick={() => navigate(alarm.redirectUrl)}
          />
        ))}
      </ul>
    </div>,
    document.body
  );
}
