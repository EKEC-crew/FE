import { regionOptions } from "../../constants/crewFilterOptions";
import RegionSelectDropdown from "../crewList/RegionSelectDropdown";

interface RegionSectionProps {
  onChange: (sido: string, gu: string) => void;
}

const RegionSection = ({ onChange }: RegionSectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <label className="font-semibold text-[1.375rem] pb-2">지역</label>
      <RegionSelectDropdown
        label="지역"
        regions={regionOptions}
        onChange={onChange}
      />
    </div>
  );
};
export default RegionSection;
