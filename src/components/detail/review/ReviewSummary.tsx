const ReviewSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl">
      {/* 평점 박스 */}
      <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 mb-1">사용자 총 평점</p>
        <div className="text-yellow-400 text-xl">★★★★★</div>
        <p className="text-xl font-bold">4.8/5</p>
      </div>

      {/* 전체리뷰수 박스 */}
      <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500 mb-1">전체 리뷰수</p>
        <div className="text-purple-600 text-2xl">👥</div>
        <p className="text-xl font-bold">126</p>
      </div>
    </div>
  );
};

export default ReviewSummary;
