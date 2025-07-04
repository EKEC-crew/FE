import { useNavigate } from 'react-router-dom';
import AddIconWt from '../../assets/icons/ic_add_36.svg';

const CreateCrewButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/create-crew')}
      className="flex items-center w-full h-[48px] px-4 gap-2 text-white text-base 
                 rounded-[16px]
                 focus:outline-none focus:ring-0 ring-0 shadow-none"
      style={{
        backgroundClip: 'padding-box',
        background:
          'linear-gradient(150deg, #3A3ADB 0%, #63BCEC 70%, #72EDFE 100%',
      }}
    >
      <img src={AddIconWt} alt="plus" className="w-7 h-7" />
      크루 만들기
    </button>
  );
};

export default CreateCrewButton;
