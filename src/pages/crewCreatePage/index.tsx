import logo from "../../assets/icons/ic_logo graphic_74.svg";
import { useState } from "react";
import CrewInfoStep from "../../components/crewCreate/CrewInfoStep";
import CrewApplicationStep from "../../components/crewCreate/CrewApplicationStep";

const crewCreatePage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1620px] px-50 lg:px-[235px] pt-20 pb-40">
        {/* 헤더 */}
        <div className="text-center my-20">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="text-[40px] font-bold text-[#000000] mb-6">
            내 손에서 탄생하는 활발한 커뮤니티
          </h2>
        </div>
        {step === 1 && <CrewInfoStep onNext={() => setStep(2)} />}
        {step === 2 && <CrewApplicationStep />}
      </div>
    </div>
  );
};

export default crewCreatePage;
