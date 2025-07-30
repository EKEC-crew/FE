import React from 'react';

interface PostButtonProps {
  onClick?: () => void;
}

const PostButton: React.FC<PostButtonProps> = ({ onClick }) => (
  <div className="flex justify-center mt-3 md:mt-1">
    <button 
      onClick={onClick}
       className="bg-[#3A3ADB] hover:bg-blue-700 text-white text-sm  py-1.5 px-7 rounded-lg">
      글쓰기
    </button>
  </div>
);

export default PostButton;