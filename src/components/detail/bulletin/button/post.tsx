import { useNavigate } from "react-router-dom";

const BulletinPostButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/detail/bulletin/1/post");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#3A3ADB] hover:bg-blue-700 text-white text-sm py-1.5 px-7 rounded-lg"
    >
      글쓰기
    </button>
  );
};

export default BulletinPostButton;
