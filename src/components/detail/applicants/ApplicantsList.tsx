import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ApplicantCard from "./ApplicantsCard";
import {
  fetchDummyApplicants,
  type ApplicantsResponse,
  type Applicant,
} from "./dummyApplicants";

export default function ApplicantsList() {
  const { ref, inView } = useInView();

  // data 타입: InfiniteData<ApplicantsResponse>
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<ApplicantsResponse>({
      queryKey: ["applicants"],
      queryFn: ({ pageParam }) => fetchDummyApplicants(pageParam as number, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  // data.pages 접근 가능
  const totalCount = data?.pages[0]?.totalCount || 0;

  const applicants = data?.pages.flatMap((page) => page.applicants) || [];

  // 스크롤이 맨 아래에 닿으면 다음 페이지 가져오기
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="p-[1.5rem] px-[3rem] py-[2.5rem] bg-white rounded-xl shadow w-[82.625rem] mx-auto">
      <div className="text-[2.25rem] font-semibold mb-[0.5rem]">
        지원자 목록
      </div>
      <p className="text-sm text-gray-500 mb-[1rem]">전체 {totalCount}명</p>

      <div className="flex flex-col gap-[1rem]">
        {applicants.map((applicant: Applicant) => (
          <ApplicantCard
            key={applicant.id}
            name={applicant.name}
            date={applicant.date}
            onConfirm={() => console.log(`${applicant.name} 확인하기 클릭`)}
          />
        ))}
      </div>

      <div ref={ref} className="h-10" />

      {isFetchingNextPage && <p className="text-center mt-4">로딩 중...</p>}
      {isLoading && <p className="text-center mt-4">데이터 불러오는 중...</p>}
    </div>
  );
}
