import { serverRegions } from "../../constants/serverRegions";
import type { ApplyOption } from "../../types/apply/types";

export function mapServerRegionsToOptions(): ApplyOption[] {
  return serverRegions.map((r) => ({
    value: r.id, // select에서 쓸 value
    label: `${r.sido}·${r.goo}`, // "서울·마포구" 형태
  }));
}
