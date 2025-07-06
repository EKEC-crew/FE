import GuestMenu from "./GuestMenu";
import UserMenu from "./userMenu";

//나중에 useAuth()로 받아올거임 지금은 더미!
const isLoggedIn = false;
const AuthSection = () => {
  return isLoggedIn ? <UserMenu /> : <GuestMenu />;
};

export default AuthSection;
