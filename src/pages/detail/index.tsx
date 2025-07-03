import React from 'react';
import Header from '../../components/detail/header';
import Notice from '../../components/detail/notice';
import Tabs from '../../components/detail/tabs';
import AboutSection from '../../components/detail/about';
import Album from '../../components/detail/album';
function Detail() {
  return (
    <div className="bg-gray-100 !importent">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="shadow-md overflow-hidden">
          <Header />
          <Tabs />
        </div>
        <Notice />
        <div className="shadow-md overflow-hidden">
          <AboutSection />
        </div>
      </div>
    </div>
  );
}

export default Detail;
