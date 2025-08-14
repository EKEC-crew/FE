import {
  activityOptions,
  categoryOptions,
  styleOptions,
} from "./crewFilterOptions";

export type TagKind = "category" | "activity" | "style";
export type TagIndexItem = { id: number; label: string; kind: TagKind };

export const TAG_INDEX: TagIndexItem[] = [
  ...categoryOptions.map((o) => ({
    id: o.value,
    label: o.label,
    kind: "category" as const,
  })),
  ...activityOptions.map((o) => ({
    id: o.value,
    label: o.label,
    kind: "activity" as const,
  })),
  ...styleOptions.map((o) => ({
    id: o.value,
    label: o.label,
    kind: "style" as const,
  })),
];
