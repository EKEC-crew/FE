import ApplicantCard from "./ApplicantsCard";

export default function ApplicantsList() {
  // 더미 데이터 (나중에 API 연동 시 대체)
  const applicants = [
    { id: 1, name: "열", date: "7/10" },
    { id: 2, name: "와니", date: "7/11" },
    { id: 3, name: "혜미", date: "7/12" },
    { id: 4, name: "현", date: "7/12" },
  ];

  return (
    <div className="p-[1.5rem] px-[3rem] py-[2.5rem] bg-white rounded-xl shadow w-[82.625rem] mx-auto">
      <div className="text-[2.25rem] font-semibold mb-[0.5rem]">
        지원자 목록
      </div>
      <p className="text-sm text-gray-500 mb-[1rem]">
        전체 {applicants.length}명
      </p>

      {/* 지원자 리스트 */}
      <div className="flex flex-col gap-[1rem]">
        {applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            name={applicant.name}
            date={applicant.date}
            onConfirm={() => console.log(`${applicant.name} 확인하기 클릭`)}
          />
        ))}
      </div>
    </div>
  );
}
