import LeftTopLogo from "../../../assets/signIn/signInLeftTopLogo.svg";

const SignInHeader = () => {
  return (
    <div className="absolute top-8 left-8">
      <img src={LeftTopLogo} alt="좌측 상단 로고" />
    </div>
  );
};

export default SignInHeader;
