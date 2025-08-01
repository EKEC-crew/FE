import { activityOptions } from "../crewList/optionsDummy";
import OptionGrid from "./OptionGrid";

interface ActivitySectionProps {
  activities: number[];
  onChange: (value: number[]) => void;
}

const ActivitySection = ({ activities, onChange }: ActivitySectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-[1.375rem] pb-2">
          활동<span className="text-[#FF4949]">*</span>
        </label>
        <span className="text-[#FF4949] text-lg font-normal pb-2">
          2~5개 복수 선택 가능
        </span>
      </div>
      <OptionGrid
        options={activityOptions}
        type="multiple"
        selected={activities}
        onChange={onChange}
        maxSelectCount={5}
        exclusivePairs={[
          [1, 2],
          [10, 11],
        ]}
      />
    </div>
  );
};

export default ActivitySection;
