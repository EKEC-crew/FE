import React from 'react';
import { useNavigate } from 'react-router-dom';



const PostButton: React.FC = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/detail/notice/post"); 
  };

  return (
    <div className="flex justify-center mt-3 md:mt-1">
      <button 
        onClick={handleClick}
        className="bg-[#3A3ADB] hover:bg-blue-700 text-white text-sm py-1.5 px-7 rounded-lg"
      >
        글쓰기
      </button>
    </div>
  );
};

export default PostButton;
