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
    <div className="flex justify-center space-x-6 bg-white p-4 shadow-sm border-b border-gray-200">
      {tabItems.map(({ name, path }) => (
        <button
          key={name}
          onClick={() => handleClick(name, path)}
          className={`relative text-sm font-semibold pb-1 ${
            activeTab === name
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-400'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;