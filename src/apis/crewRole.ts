import { API } from "./axios";

export const CrewMemberRole = async (
  crewId: number,
  memberId: number,
  newRole: number
) => {
  console.log(
    "📡 요청 보내는 URL 확인:",
    `/crew/${crewId}/member/${memberId}/role`
  );
  console.log("📦 보낼 데이터:", { role: newRole });

  const res = await API.put(`/crew/${crewId}/member/${memberId}/role`, {
    role: newRole,
  });
  return res.data.data;
};
