import { useEffect, useRef, useState } from "react";
import resetIcon from "../../assets/icons/ic_reset_28.svg";
import downIcon28 from "../../assets/icons/ic_Down_28.svg";
import closeIcon from "../../assets/icons/ic_dissmiss_20.svg";

interface RegionMap {
  [city: string]: string[];
}

interface RegionSelectDropdownProps {
  label: string;
  regions: RegionMap;
  onChange: (city: string, gu: string) => void;
}

const RegionSelectDropdown = ({
  label,
  regions,
  onChange,
}: RegionSelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(""); // 선택된 시/도
  const [selectedRegions, setSelectedRegions] = useState<
    // 선택된 시/도와 구/군의 조합
    { city: string; district: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지용

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleDistrictToggle = (district: string) => {
    const exists = selectedRegions.find(
      (r) => r.city === selectedCity && r.district === district
    );
    if (exists) {
      setSelectedRegions((prev) =>
        prev.filter(
          (r) => !(r.city === selectedCity && r.district === district)
        )
      );
    } else {
      setSelectedRegions((prev) => [...prev, { city: selectedCity, district }]);
    }
  };

  const handleRemoveSelected = (city: string, district: string) => {
    setSelectedRegions((prev) =>
      prev.filter((r) => !(r.city === city && r.district === district))
    );
  };

  const reset = () => {
    setSelectedCity("");
    setSelectedRegions([]);
  };

  const apply = () => {
    setOpen(false);
    const first = selectedRegions[0];
    if (first) {
      onChange(first.city, first.district);
    }
  };

  const getButtonLabel = () => {
    if (selectedRegions.length === 0) return label;
    const joined = selectedRegions
      .map((r) => `${r.city} ${r.district}`)
      .join(" · ");
    return joined.length > 8 ? joined.slice(0, 8) + "..." : joined;
  };

  const isSelected = selectedRegions.length > 0;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          inline-flex items-center gap-2 px-5 h-12 rounded-full border-[2px] text-xl font-normal cursor-pointer
          ${isSelected ? "border-[#3A3ADB] bg-[#ECECFC]" : "border-[#D9DADD] bg-white"}
          text-[#000000] max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis
        `}
      >
        {getButtonLabel()}
        <img src={downIcon28} alt="열기" />
      </button>

      {open && (
        <div className="absolute mt-2 pt-2 bg-white shadow-md rounded-md z-10 flex flex-col w-[90vw] max-w-[500px]">
          <div className="flex h-[70vh] max-h-[370px]">
            {/* 시/도 */}
            <div className="w-1/2 overflow-y-auto pr-2 text-xl">
              {Object.keys(regions).map((city) => (
                <div
                  key={city}
                  className={`cursor-pointer px-2 py-2 ${selectedCity === city ? "bg-[#3A3ADB] text-white" : "text-black"}`}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>

            {/* 구/군 */}
            <div className="w-1/2 overflow-y-auto pl-2 bg-[#F7F7FB] text-xl">
              {selectedCity &&
                regions[selectedCity].map((district) => {
                  const selected = selectedRegions.find(
                    (r) => r.city === selectedCity && r.district === district
                  );
                  return (
                    <div
                      key={district}
                      className={`cursor-pointer px-2 py-2 ${selected ? "text-[#3A3ADB]" : "text-black"}`}
                      onClick={() => handleDistrictToggle(district)}
                    >
                      {district}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="bg-[#EFF0F4]">
            {/* 태그 */}
            <div className="flex flex-wrap p-4 gap-2 bg-[#EFF0F4]">
              {selectedRegions.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2 py-1 bg-[#C5C6CB] rounded-md text-base font-medium text-[#5E6068]"
                >
                  {r.city} {r.district}
                  <button
                    onClick={() => handleRemoveSelected(r.city, r.district)}
                    className="text-[#5E6068]"
                  >
                    <img src={closeIcon} alt="삭제" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end items-center gap-2 p-4">
              <button
                onClick={reset}
                className="w-24 h-8 flex items-center justify-center gap-1 bg-[#C5C6CB] rounded text-[#37383E] text-base"
              >
                <img src={resetIcon} alt="초기화" className="w-5 h-5" />
                초기화
              </button>

              <button
                onClick={apply}
                className="w-24 h-8 bg-[#3A3ADB] rounded text-white text-base"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelectDropdown;
