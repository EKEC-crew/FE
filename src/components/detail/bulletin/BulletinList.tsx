import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BULLETIN_LIST } from './constants';
import BulletinPostButton from './button/post';
import Pagination from './button/pagination';
import BulletinItem from './BulletinItem';
import Header from '../header';
import Tabs from '../tabs';
import Notice from '../notice';

interface Bulletin {
  id: number;
  title: string;
  date: string;
  author: string;
  isPopular: boolean;
  hasAttachment: boolean;
}

const BulletinList: React.FC = () => {
  const navigate = useNavigate();
  
  const [activeTab] = useState<string>("bulletin");
  const [bulletins] = useState<Bulletin[]>(BULLETIN_LIST);

  const handleBulletinClick = useCallback((bulletin: Bulletin) => {
    console.log("게시글 클릭:", bulletin);
    navigate(`/detail/bulletin/${bulletin.id}/detail`);
  }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "bulletin":
        return (
          <>
            <div className="space-y-2">
              {bulletins.map((bulletin, index) => (
                <BulletinItem
                  key={bulletin.id}
                  bulletin={bulletin}
                  onBulletinClick={handleBulletinClick}
                  index={index}
                />
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2 my-8">
              <Pagination />
            </div>
            <div className="flex justify-center mt-1">
              <BulletinPostButton />
            </div>
          </>
        );
      case "review":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">후기가 없습니다.</p>
          </div>
        );
      case "schedule":
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">예정된 일정이 없습니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-6 space-y-6 pt-12 mt-2">
        <div>
          <Header/>
          <Tabs />
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto px-1">
      <Notice/>
    </div>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-8 mb-8">
        <span className="text-xl font-bold mb-2">게시판</span>
        <p className="text-gray-600 text-sm pt-2 py-4">전체 {bulletins.length}건</p>
        {renderContent()}
      </div>
    </div>
  );
};

export default BulletinList;