import { Link } from "react-router-dom";
import LeftTopLogo from "../../../../public/signIn/signInLeftTopLogo.svg";
import Kakao from "../../../../public/signIn/signInKakaoLogo.svg";
import Google from "../../../../public/signIn/signInGoogleLogo.svg";
import Naver from "../../../../public/signIn/signInNaverLogo.svg";
import Ekec from "../../../../public/signIn/signInEkecLogo.svg";
import emailSignInBtn from "../../../../public/signIn/btn_login_520x68.svg";

const SignInPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-96 h-96 left-[308.70px] top-[255px] absolute origin-top-left rotate-[0.62deg] bg-cyan-300 rounded-full blur-[100px]"></div>
        <div className="w-[762.25px] h-[762.25px] left-[709.07px] top-[506.93px] absolute origin-top-left rotate-[-164.38deg] bg-indigo-400 rounded-full blur-[250px]"></div>
        <div className="w-[565px] h-[565px] left-[893px] top-[828.39px] absolute origin-top-left rotate-[-18.08deg] bg-indigo-700 rounded-full blur-[136.55px]"></div>
        <div className="w-[827px] h-[827px] left-[976.58px] top-[494.72px] absolute origin-top-left rotate-[-18.08deg] bg-cyan-200 rounded-full blur-[238.40px]"></div>
      </div>

      <div className="absolute top-8 left-8 z-20">
        <img src={LeftTopLogo} alt="좌측 상단 로고" />
      </div>

      <div
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{ paddingTop: "9vh", paddingBottom: "9vh" }}
      >
        <div className="w-[90vw] h-[75vh] sm:w-[75vw] sm:h-[78vh] md:w-[50vw] md:h-[80vh] lg:w-[40vw] lg:h-[81vh] xl:w-[36.5vw] xl:h-[82vh]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 h-full flex flex-col justify-center p-15 overflow-hidden">
            <div className="text-center mb-15">
              <h2 className="text-4xl font-semibold text-neutral-800 mb-2 text-center leading-relaxed">
                손쉽게 내 성향에 맞는
                <br /> 모임을 찾아봐요!
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

              <Link
                to="/signIn/kakao"
                className="w-full relative flex items-center px-4 py-3.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:shadow-inner active:transform active:translate-y-0.5 text-black"
                style={{ backgroundColor: "#FEE500" }}
              >
                <img
                  src={Kakao}
                  alt="카카오 로고"
                  className="absolute left-5"
                />
                <div className="w-full text-center justify-center text-black text-l font-medium font-['Pretendard']">
                  카카오 계정으로 계속하기
                </div>
              </Link>

              <Link
                to="/signIn/naver"
                className="w-full relative flex items-center px-4 py-3.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md active:shadow-inner active:transform active:translate-y-0.5 text-black"
                style={{ backgroundColor: "#03C75A" }}
              >
                <img
                  src={Naver}
                  alt="네이버 로고"
                  className="absolute left-5"
                />
                <div className="w-full text-center justify-center text-black text-l font-medium font-['Pretendard']">
                  네이버 계정으로 계속하기
                </div>
              </Link>

              <Link
                to="/signIn/google"
                className="w-full relative flex items-center px-4 py-3 bg-white hover:bg-gray-100 active:shadow-inner active:transform active:translate-y-0.5 text-black border border-gray-300 rounded-lg font-medium transition-all duration-200"
              >
                <img src={Google} alt="구글 로고" className="absolute left-5" />
                <div className="w-full text-center justify-center text-l font-medium font-['Pretendard']">
                  Google 계정으로 계속하기
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
