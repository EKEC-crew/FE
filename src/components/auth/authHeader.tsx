import { Link } from "react-router-dom";
import LeftTopLogo from "../../assets/signIn/signInLeftTopLogo.svg";

const AuthHeader = () => {
  return (
    <div className="absolute top-8 left-8 z-20">
      <Link
        to="/"
        className="block transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
      >
        <img src={LeftTopLogo} alt="홈으로 가기" />
      </Link>
    </div>
  );
};

export default AuthHeader;
