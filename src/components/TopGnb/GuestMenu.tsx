import { useNavigate } from "react-router-dom";

const GuestMenu = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/signIn")}
      className="text-gray-500 rounded-2xl"
    >
      로그인/회원가입
    </button>
  );
};

export default GuestMenu;
