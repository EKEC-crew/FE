export interface AppliedCrew {
  applyId: number;
  name: string;
  description: string;
  imageUrl: string;
  status: "미승인" | "크루원";
  crewId: number;
}
