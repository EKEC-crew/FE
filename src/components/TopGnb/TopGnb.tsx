import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/logo/LOGO.svg";
import AuthSection from "./AuthSection";
import SearchBar from "./SearchBar";
import { Menu } from "lucide-react";

interface TopGnbProps {
  onToggleNav: () => void;
  isNavOpen: boolean;
  isLargeScreen: boolean;
}

const TopGnb = ({ onToggleNav, isNavOpen }: TopGnbProps) => {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-16 pl-5 pr-15 flex items-center justify-between  bg-white shadow-sm fixed top-0 z-50  ">
      <div>
        <button
          onClick={onToggleNav}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={isNavOpen ? "네비게이션 닫기" : "네비게이션 열기"}
        >
          <Menu className="transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer h-6 w-6" />
        </button>
        <button onClick={() => navigate("/")}>
          <img
            src={mainLogo}
            alt="logo"
            className="w-50 h-7 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
          />
        </button>
      </div>
      <SearchBar variant={"compact"} />
      <AuthSection />
    </nav>
  );
};

export default TopGnb;
