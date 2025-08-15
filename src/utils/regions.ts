import { serverRegions } from "../constants/serverRegions";

export const regionIdLookup: Record<
  string,
  Record<string, number>
> = serverRegions.reduce(
  (acc, r) => {
    if (!acc[r.sido]) acc[r.sido] = {};
    acc[r.sido][r.goo] = r.id;
    return acc;
  },
  {} as Record<string, Record<string, number>>
);

export const getRegionId = (
  sido?: string | null,
  gu?: string | null
): number | null => {
  if (!sido || !gu) return null;
  return regionIdLookup[sido]?.[gu] ?? null;
};

export const idToRegion: Record<number, { sido: string; gu: string }> =
  Object.fromEntries(
    serverRegions.map((r) => [r.id, { sido: r.sido, gu: r.goo }])
  );
