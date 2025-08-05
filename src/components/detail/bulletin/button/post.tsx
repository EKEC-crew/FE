import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const BulletinPostButton: React.FC = () => {
  const navigate = useNavigate();
  const { crewId } = useParams();

  const handleWriteClick = () => {
    if (!crewId) {
      alert("crewId가 없습니다!");
      return;
    }

    navigate(`/crew/${crewId}/bulletin/post`);
  };

  return (
    <button
      onClick={handleWriteClick}
      className="bg-[#3A3ADB] hover:bg-blue-700 text-white text-sm py-1.5 px-7 rounded-lg"
    >
      글쓰기
    </button>
  );
};

export default BulletinPostButton;
