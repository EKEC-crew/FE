import { Link } from "react-router-dom";

import Kakao from "../../../assets/signIn/signInKakaoLogo.svg";
import Google from "../../../assets/signIn/signInGoogleLogo.svg";
import Naver from "../../../assets/signIn/signInNaverLogo.svg";
import Ekec from "../../../assets/signIn/signInEkecLogo.svg";
import emailSignInBtn from "../../../assets/signIn/btn_login_520x68.svg";

import SocialSignInButton from "./socialSignInButton";

const SignInForm = () => {
  return (
    <>
      <div className="text-center mb-15">
        <div className="text-4xl font-semibold text-neutral-800 mb-2 text-center leading-relaxed">
          손쉽게 내 성향에 맞는 <br /> 모임을 찾아봐요!
        </div>
        <div className="justify-center text-neutral-800 text-lg font-normal font-['Pretendard']">
          이크에크는 크루 참여 및 관리가 편리해요
        </div>
      </div>

      <div
        className="space-y-3 mt-8"
        style={{ paddingLeft: "12.86%", paddingRight: "12.86%" }}
      >
        <Link
          to="/signIn/email"
          className="w-full relative flex items-center justify-center hover:opacity-90 active:transform active:translate-y-0.5"
        >
          <img
            src={emailSignInBtn}
            alt="이메일 로그인 버튼"
            className="w-full h-full"
          />
          <img src={Ekec} alt="EKEC 로고" className="absolute left-5" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium font-['Pretendard']">
            EKEC ID로 계속하기
          </div>
        </Link>

        <SocialSignInButton
          to="/signIn/kakao"
          imgSrc={Kakao}
          alt="카카오 로고"
          text="카카오 계정으로 계속하기"
          bgColor="#FEE500"
        />
        <SocialSignInButton
          to="/signIn/naver"
          imgSrc={Naver}
          alt="네이버 로고"
          text="네이버 계정으로 계속하기"
          bgColor="#03C75A"
        />
        <SocialSignInButton
          to="/signIn/google"
          imgSrc={Google}
          alt="구글 로고"
          text="Google 계정으로 계속하기"
          border="border border-gray-300 bg-white hover:bg-gray-100"
        />
      </div>
    </>
  );
};

export default SignInForm;
