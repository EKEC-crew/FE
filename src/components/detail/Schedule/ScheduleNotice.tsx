interface ScheduleNoticeProps {
  content: string;
}

const ScheduleNotice = ({ content }: ScheduleNoticeProps) => {
  return (
    <div className="text-sm bg-[#EFF0F4] px-4 py-6 rounded-2xl font-semibold text-gray-800 space-y-1">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-gray-700 font-normal"
      />
    </div>
  );
};

export default ScheduleNotice;
