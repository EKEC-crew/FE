import { categoryOptions } from "../../constants/crewFilterOptions";
import OptionGrid from "./OptionGrid";

interface CategorySectionProps {
  category: number | null;
  onChange: (value: number) => void;
}

const CategorySection = ({ category, onChange }: CategorySectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <label className="font-semibold text-[1.375rem] pb-2">
        카테고리<span className="text-[#FF4949]">*</span>
      </label>
      <OptionGrid
        options={categoryOptions}
        type="single"
        selected={category ?? 0}
        onChange={onChange}
      />
    </div>
  );
};

export default CategorySection;
