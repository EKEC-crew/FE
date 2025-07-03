import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tabItems = [
  { name: '소개', path: '/detail/about' },
  { name: '일정', path: '/detail/schedule' },
  { name: '리뷰', path: '/detail/review' },
  { name: '앨범', path: '/detail/album' },
  { name: '게시판', path: '/detail/board' },
];

function Tabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('소개');

  const handleClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="flex justify-between bg-white border-b border-gray-200">
      {tabItems.map(({ name, path }) => {
        const isActive = activeTab === name;
        return (
          <button
            key={name}
            onClick={() => handleClick(name, path)}
            className={`relative flex-1 text-center py-3 text-sm font-bold 
              ${isActive ? 'text-[#373EE7]' : 'text-[#A1A1A1]'}`}
          >
            {name}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-[1] bg-[#373EE7]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
