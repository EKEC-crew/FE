

const Album = () => {

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">그룹 활동 미리보기</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          전체보기 →
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-6">크루원의 활동 사진으로 활동 내용 확인</p>
      <div className="grid grid-cols-3 gap-3 max-w-lg">
                 <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-60"></div>
         </div>
         <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-60"></div>
         </div>
        
        <div className="row-span-2 bg-blue-600 rounded-lg"></div>

        <div className="aspect-square bg-cyan-300 rounded-lg"></div>
                 <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative">
           <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-60"></div>
         </div>
      </div>
    </div>
  );
};

export default Album;