import { useNavigate } from "react-router-dom";
import AddIconWt from "../../assets/icons/ic_add_36.svg";
import addBtnBg from "../../assets/icons/btn_generate_crew_260x55.svg";
const CreateCrewButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-crew")}
      className="relative flex items-center w-full h-[48px] px-4 gap-2 text-white text-base 
                 rounded-[8px]
                 focus:outline-none focus:ring-0 ring-0 shadow-none"
    >
      <img
        src={addBtnBg}
        alt="배경"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <img src={AddIconWt} alt="plus" className="w-6 h-6" />
      크루 만들기
    </button>
  );
};

export default CreateCrewButton;
