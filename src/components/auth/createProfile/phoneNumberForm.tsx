import { useNavigate } from "react-router-dom";
import Input from "../input";
import disabledBtn from "../../../assets/buttons/disabled.svg";
import passBtn from "../../../assets/buttons/pass.svg";
import infoIcon from "../../../assets/icons/createProfile/info.svg";

const PhoneNumberForm = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="flex flex-col items-start mb-6"
        style={{ width: "27.08vw" }}
      >
        <div className="mb-2">
          <span className="text-zinc-800 text-xl font-semibold font-['Pretendard']">
            전화번호
          </span>
          <span className="text-red-500 text-xl font-semibold">*</span>
        </div>

        <div className="flex items-start gap-[1.04vw]">
          <Input
            type="text"
            placeholder="'-'를 제외한 전화번호를 입력하세요"
            width="19.79vw"
          />
          <button
            className="bg-indigo-700 text-white rounded-[10px] text-sm md:text-base lg:text-lg font-medium hover:bg-indigo-800 transition-colors flex items-center justify-center"
            style={{ width: "6.25vw", height: "6.3vh" }}
          >
            인증하기
          </button>
        </div>
      </div>

      <div
        className="flex flex-col items-start mb-6"
        style={{ width: "27.08vw" }}
      >
        <div className="mb-2">
          <span className="text-zinc-800 text-xl font-semibold">
            인증번호 입력
          </span>
          <span className="text-red-500 text-xl font-semibold">*</span>
        </div>

        <div className="flex items-start gap-[1.04vw]">
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요"
            width="19.79vw"
          />
          <button
            className="bg-indigo-700 text-white rounded-[10px] text-sm md:text-base lg:text-lg font-medium hover:bg-indigo-800 transition-colors flex items-center justify-center"
            style={{ width: "6.25vw", height: "6.3vh" }}
          >
            재전송
          </button>
        </div>

        <div className="flex items-center gap-1">
          <img src={infoIcon} alt="정보 아이콘" />
          <div className="text-gray-600 text-lg font-normal underline">
            인증번호가 오지 않았어요
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleComplete}
          className="relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5 mb-4"
          style={{ width: "27.08vw" }}
        >
          <img
            src={disabledBtn}
            alt="프로필 설정 완료"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm md:text-base lg:text-lg font-medium font-['Pretendard']">
            프로필 설정 완료
          </div>
        </button>

        <div
          className="h-0 border-t border-neutral-400 mb-4"
          style={{ width: "27.08vw" }}
        />
        <button
          className="relative flex items-center justify-center h-12 md:h-14 lg:h-[4.25rem] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5"
          style={{ width: "27.08vw" }}
        >
          <img
            src={passBtn}
            alt="Pass로 인증하기"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default PhoneNumberForm;
