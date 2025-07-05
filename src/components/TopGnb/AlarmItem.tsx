import chatText from "../../assets/icons/ic_ChatText_40.svg";

interface Props {
  crewName: string;
  content: string;
  isRead: boolean;
  onClick: () => void;
}

export default function AlarmItem({
  crewName,
  content,
  isRead,
  onClick,
}: Props) {
  return (
    <li
      onClick={onClick}
      className="px-4 py-4 m-3 text-sm hover:bg-gray-100 cursor-pointer flex justify-between items-start rounded-2xl bg-white"
    >
      <div className="flex items-center gap-2">
        <img src={chatText} alt="알람설명아이콘" className="h-10 w-15" />
        <div>
          <p className="font-semibold">{crewName}</p>
          <p>{content}</p>
        </div>
      </div>
      {!isRead && <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />}
    </li>
  );
}
