import { useNavigate } from "react-router-dom";
import userIc from "../../assets/icons/topGnb/ic_line_user.svg";

const GuestMenu = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/signIn")}
      className="cursor-pointer w-[12.25rem] h-[3.125rem] sm:w-[10rem] sm:h-[2.5rem]
      flex items-center justify-center gap-2 border rounded-full border-[#D2D3D8] text-[#5E6068] hover:bg-gray-100
      transition-transform duration-300 ease-in-out hover:scale-110
      "
    >
      <img
        src={userIc}
        alt="user icon"
        className="w-[1.75rem] h-[1.75rem] sm:w-[1.25rem] sm:h-[1.25rem]"
      />
      <span className="text-base font-medium sm:text-sm">로그인/회원가입</span>
    </button>
  );
};

export default GuestMenu;
