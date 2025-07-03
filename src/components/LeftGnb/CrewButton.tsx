import { useNavigate } from "react-router-dom";
import AddIconWt from "../../assets/icons/ic_add_36.svg";

const CreateCrewButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-crew")}
      className="flex items-center w-full h-[48px] px-4 gap-2 text-white text-base 
                 rounded-[16px] bg-gradient-to-br from-[#3A3ADB] via-[#3A3ADB] to-[#7fb7b9]
                 focus:outline-none focus:ring-0 ring-0 shadow-none"
      style={{
        backgroundClip: "padding-box",
      }}
    >
      <img src={AddIconWt} alt="plus" className="w-7 h-7" />
      크루 만들기
    </button>
  );
};

export default CreateCrewButton;
