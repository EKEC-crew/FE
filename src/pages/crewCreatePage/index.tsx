import logo from "../../assets/icons/ic_logo graphic_74.svg";
import { useState } from "react";
import CrewInfoStep from "../../components/crewCreate/CrewInfoStep";
import type { CrewInfo } from "../../types/crewCreate/crew";
import CrewApplicationStep from "../../components/crewCreate/CrewApplicationStep";
import type { ServerQuestion } from "../../types/crewCreate/crew";
import { API } from "../../apis/axios";

const crewCreatePage = () => {
  const [step, setStep] = useState(1);
  const [crewInfo, setCrewInfo] = useState<CrewInfo | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const handleSubmitWith = async (applicationForm: ServerQuestion[]) => {
    console.log("handleSubmit 실행됨");

    if (!crewInfo || applicationForm.length === 0) {
      console.log("필수 정보 누락");
      return;
    }

    const formData = new FormData();

    if (bannerImage) {
      formData.append("bannerImage", bannerImage);
    }

    formData.append("crewInfo", JSON.stringify(crewInfo));
    formData.append(
      "applicationForm",
      JSON.stringify({ questions: applicationForm })
    );

    const token = localStorage.getItem("accessToken");

    try {
      const res = await API.post("/crew/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("성공:", res.data);
    } catch (err: any) {
      console.error("실패:", err);
      if (err.response) {
        console.log("서버 응답 상태코드:", err.response.status);
        console.log("서버 응답 메시지:", err.response.data);
      }
    }
  };

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
        {step === 1 && (
          <CrewInfoStep
            onNext={(info) => {
              setCrewInfo(info.crewInfo);
              setBannerImage(info.bannerImage);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <CrewApplicationStep
            onSubmit={(questions) => {
              handleSubmitWith(questions);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default crewCreatePage;
