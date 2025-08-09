import React from "react";
import { useNavigate, useParams } from "react-router-dom";

type PostButtonProps = {
  onClick: () => void;
};

const PostButton: React.FC<PostButtonProps> = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const handleClick = () => {
    // 또는 props로 전달받기
    navigate(`/crew/${crewId}/notice/post`);
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
