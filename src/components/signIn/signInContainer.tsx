import { Link } from "react-router-dom";

import Kakao from "../../../public/signIn/signInKakaoLogo.svg";
import Google from "../../../public/signIn/signInGoogleLogo.svg";
import Naver from "../../../public/signIn/signInNaverLogo.svg";
import Ekec from "../../../public/signIn/signInEkecLogo.svg";
import emailSignInBtn from "../../../public/signIn/btn_login_520x68.svg";

import SignInButton from "./signInButton";

const SignInContainer = () => {
  return (
    <div
      className="relative z-10 flex items-center justify-center min-h-screen px-4"
      style={{ paddingTop: "9vh", paddingBottom: "9vh" }}
    >
      <div className="w-[90vw] h-[75vh] sm:w-[75vw] sm:h-[78vh] md:w-[50vw] md:h-[80vh] lg:w-[40vw] lg:h-[81vh] xl:w-[36.5vw] xl:h-[82vh]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 h-full flex flex-col justify-center p-15 overflow-hidden">
          <div className="text-center mb-15">
            <h2 className="text-4xl font-semibold text-neutral-800 mb-2 text-center leading-relaxed">
              손쉽게 내 성향에 맞는 <br /> 모임을 찾아봐요!
            </h2>
            <h3 className="justify-center text-neutral-800 text-lg font-normal font-['Pretendard']">
              이크에크는 크루 참여 및 관리가 편리해요
            </h3>
          </div>

          <div
            className="space-y-3 mt-8"
            style={{ paddingLeft: "12.86%", paddingRight: "12.86%" }}
          >
            <Link
              to="/signIn/email"
              className="w-full relative flex items-center justify-center h-[68px] transition-all duration-200 hover:opacity-90 active:transform active:translate-y-0.5"
            >
              <img
                src={emailSignInBtn}
                alt="이메일 로그인 버튼"
                className="w-full h-full object-contain"
              />
              <img src={Ekec} alt="EKEC 로고" className="absolute left-5" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium font-['Pretendard']">
                EKEC ID로 계속하기
              </div>
            </Link>

            <SignInButton
              to="/signIn/kakao"
              imgSrc={Kakao}
              alt="카카오 로고"
              text="카카오 계정으로 계속하기"
              bgColor="#FEE500"
            />
            <SignInButton
              to="/signIn/naver"
              imgSrc={Naver}
              alt="네이버 로고"
              text="네이버 계정으로 계속하기"
              bgColor="#03C75A"
            />
            <SignInButton
              to="/signIn/google"
              imgSrc={Google}
              alt="구글 로고"
              text="Google 계정으로 계속하기"
              border="border border-gray-300 bg-white hover:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContainer;
