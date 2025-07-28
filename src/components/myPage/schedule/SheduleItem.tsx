interface ScheduleItemProps {
  dayLabel: string;
  title: string;
  description: string;
}

function ScheduleItem({ dayLabel, title, description }: ScheduleItemProps) {
  return (
    <div className="flex items-center gap-x-4 bg-[#F7F7FB] rounded-xl px-4 py-3">
      <span className="bg-[#3A3CDB] text-white text-[1.25rem] px-3 py-1 rounded-full w-[6.4375rem] h-[2.5rem] flex items-center justify-center">
        {dayLabel}
      </span>
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-[1.5rem] text-black">{title}</span>
        <span className="text-[1.25rem] text-gray-500">{description}</span>
      </div>
    </div>
  );
}

export default ScheduleItem;
