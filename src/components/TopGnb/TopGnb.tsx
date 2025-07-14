import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/logo/LOGO.svg";
import AuthSection from "./AuthSection";
import SearchBar from "./SearchBar";
const TopGnb = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-16 pl-5 pr-15 flex items-center justify-between bg-white shadow-sm fixed top-0 z-50 ">
      <button onClick={() => navigate("/")}>
        <img src={mainLogo} alt="logo" className="w-50 h-7" />
      </button>
      <SearchBar variant={"compact"} />
      <AuthSection />
    </nav>
  );
};

export default TopGnb;
