const NoticeAbout = () => {
  return (
    <div className="text-sm bg-[#EFF0F4] px-4 py-6 rounded-2xl font-semibold text-gray-800 space-y-1">
      <p>✔️ 일정 안내</p>
      <ul className="list-disc list-inside">
        <li>일시: 2025년 5월 24일(토) 오후 5시</li>
        <li>장소: 잠실야구장</li>
        <li>경기: SSG vs NC</li>
        <li>참가비: 일반 10,000+문 앞 입금 10,000</li>
        <li>신청 마감일: 5월 17일 (금)</li>
      </ul>
      <p className="mt-2 text-gray-700">많은 참여 부탁드립니다!</p>
    </div>
  );
};

export default NoticeAbout;
