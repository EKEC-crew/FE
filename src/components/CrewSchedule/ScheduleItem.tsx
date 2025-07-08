interface Props {
  type: "정기" | "번개";
  label?: string;
  title: string;
  date: string;
  status: string;
  isNew?: boolean;
}

const ScheduleItem = ({ type, label, title, date, status, isNew }: Props) => (
  <div className="flex items-center justify-between p-3 px-7 bg-[#F7F7FB] rounded-xl shadow-sm mb-2">
    <div className="flex items-center gap-2">
      <span
        className={`text-white px-1.5 py-0.5 rounded-full text-xs ${
          type === "정기" ? "bg-[#3A3ADB]" : "bg-[#72EDF2]"
        }`}
      >
        {type}
      </span>
      {label && (
        <span className="text-xs border border-gray-300 rounded px-1">
          {label}
        </span>
      )}
      <span className="font-semibold text-sm">{title}</span>
      {isNew && <span className="text-[#FF4949] text-xs">●</span>}
    </div>
    <div className="flex items-center gap-5">
      <span className="text-[#93949D] text-sm">{date}</span>
      <button
        className={`text-xs font-semibold px-2 py-1 rounded ${
          status === "신청하기"
            ? "bg-[#3A3ADB] text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {status}
      </button>
    </div>
  </div>
);

export default ScheduleItem;
