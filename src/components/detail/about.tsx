import "../../index.css";
import React from "react";

interface AlbumImage {
  id: string;
  src: string;
  label: string;
}

const albumImages: AlbumImage[] = [{ id: "1", src: "경로", label: "6-1" }];

const AboutSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl text-red-500 font-bold">5</span>
          <span className="font-semibold text-gray-800">모임 소개</span>
        </div>
        <div className="text-sm text=gray-700 leading-relaxed">
          <p>사이클링히트는 잠실 2030 여성 야구 직관 동호회입니다.</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>조용한 매너 관람을 지향합니다</li>
            <li>티켓 양도 및 되팔이 금지</li>
            <li> 정치 종교 관련 발언 금지</li>
          </ul>
          <p className="m-2">
            정기 모임은 매월 1~2회, 잠실구장에서 진행되며 사전 신청제로
            운영됩니다
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="test-xl text-red-500 font-bold"></span>
          <span className="font-semibold text-gray-800">앨범</span>
        </div>

        <div className="grid gird-cols-3 gap-4">
          {albumImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
              <span className="absoulte tup=1 left-1 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {image.label}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-center border-gray-300 rounded-lg h-32 text-3xl text-gray-400 cursor-pointer">
            +
          </div>
          <div className="flex items-center justify-center border-gray-300 rounded-lg h-32 text-3xl text-gray-400 cursor-pointer">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
