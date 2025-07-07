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

  return (
    <div className="absolute right-0 top-15 w-100 bg-[#F7F7FB] rounded-2xl shadow-md overflow-auto z-50">
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
    </div>
  );
}
