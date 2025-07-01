import React from 'react';
import Header from '../../components/Detail/Header';

function Detail() {
    const club = {
        name: "사이클링히트",
        description: "잠실 2030 여성 야구 직관 크루",
        category: "스포츠관람",
        memberCount: 45,
        memberLimit: 50,
        rating: 4.8,
    };
    const user = {
        nickname: "0000",
        isLeader: true,
    };

  return (
    <div>
      <Header />
      {/* Detail 페이지의 나머지 내용 */}
    </div>
  );
}

export default Detail;