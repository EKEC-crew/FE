// 지원자 타입
export interface Applicant {
  id: number;
  name: string;
  date: string;
}

// API 응답 타입
export interface ApplicantsResponse {
  applicants: Applicant[];
  totalCount: number;
  nextPage: number | null;
}

// 더미 데이터 (총 70명)
export const dummyApplicants: Applicant[] = Array.from(
  { length: 70 },
  (_, i) => ({
    id: i + 1,
    name: `지원자 ${i + 1}`,
    date: `7/${(i % 30) + 1}`,
  })
);

// 더미 API (페이지 단위로 데이터 가져오기)
export async function fetchDummyApplicants(
  page: number,
  limit: number = 10
): Promise<ApplicantsResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      const applicants = dummyApplicants.slice(start, end);

      resolve({
        applicants,
        totalCount: dummyApplicants.length,
        nextPage: end < dummyApplicants.length ? page + 1 : null,
      });
    }, 500); // 로딩 딜레이 흉내
  });
}
