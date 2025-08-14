export default function ApplyStepHeader({
  step,
  title,
  required,
}: {
  step: 1 | 2 | number;
  title: string;
  required?: boolean;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 pb-[4px]">
      <div className="flex h-[28px] w-[78px] items-center justify-center rounded-[6px] bg-[#3A3ADB] text-white">
        {`STEP ${step}`}
      </div>
      <div>
        {title} {required && <span className="text-[#FF4949]">*</span>}
      </div>
    </div>
  );
}
