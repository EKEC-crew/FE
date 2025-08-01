import { styleOptions } from "../crewList/optionsDummy";
import OptionGrid from "./OptionGrid";

interface StyleSectionProps {
  styles: number[];
  onChange: (value: number[]) => void;
}

const StyleSection = ({ styles, onChange }: StyleSectionProps) => {
  return (
    <div className="flex flex-col pb-8">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-[1.375rem] pb-2">
          스타일<span className="text-[#FF4949]">*</span>
        </label>
        <span className="text-[#FF4949] text-lg font-normal pb-2">
          2~5개 복수 선택 가능
        </span>
      </div>
      <OptionGrid
        options={styleOptions}
        type="multiple"
        selected={styles}
        onChange={onChange}
        maxSelectCount={5}
        exclusivePairs={[[11, 12]]}
      />
    </div>
  );
};

export default StyleSection;
