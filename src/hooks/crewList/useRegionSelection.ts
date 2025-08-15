import { serverRegions } from "../../constants/serverRegions";
import { useCallback, useEffect, useRef, useState } from "react";

const idToRegion: Record<number, { city: string; district: string }> =
  Object.fromEntries(
    serverRegions.map((r) => [r.id, { city: r.sido, district: r.goo }])
  );

export type RegionPair = { city: string; district: string };

export function useRegionSelection(valueIds?: number[]) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<RegionPair[]>([]);
  const lastIdsRef = useRef<string>("");

  // 외부 valueIds → 내부 상태 동기화 (같은 값이면 skip)
  useEffect(() => {
    const ids = valueIds ?? [];
    const key = ids.join(",");
    if (key === lastIdsRef.current) return;
    lastIdsRef.current = key;

    if (ids.length === 0) {
      setSelectedRegions([]);
      setSelectedCity("");
      return;
    }
    const mapped = ids.map((id) => idToRegion[id]).filter(Boolean);
    setSelectedRegions(mapped);
    setSelectedCity(mapped[0]?.city ?? "");
  }, [valueIds]);

  const selectCity = useCallback((city: string) => setSelectedCity(city), []);

  const toggleDistrict = useCallback(
    (district: string) => {
      setSelectedRegions((prev) => {
        const exists = prev.some(
          (r) => r.city === selectedCity && r.district === district
        );
        return exists
          ? prev.filter(
              (r) => !(r.city === selectedCity && r.district === district)
            )
          : [...prev, { city: selectedCity, district }];
      });
    },
    [selectedCity]
  );

  const removeSelected = useCallback((city: string, district: string) => {
    setSelectedRegions((prev) =>
      prev.filter((r) => !(r.city === city && r.district === district))
    );
  }, []);

  const reset = useCallback(() => {
    setSelectedCity("");
    setSelectedRegions([]);
  }, []);

  return {
    selectedCity,
    selectedRegions,
    selectCity,
    toggleDistrict,
    removeSelected,
    reset,
  };
}
