import type { ApplicantsDTO, ApplicantsAll } from "../../types/apply/types";

export function mapApplicants(dto: ApplicantsDTO): ApplicantsAll {
  const box = dto.success.applicants;
  const list = box?.applicants ?? [];

  return {
    totalCount: box?.totalCount ?? list.length,
    all: list.map((it) => ({
      applyid: it.applyId, // 그대로 네 키에 맞춤
      nickname: it.nickname,
      appliedAt: it.appliedAt,
      ProfileImage: it.profileImage ?? null,
      status: it.status,
    })),
  };
}
