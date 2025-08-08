import { useAuthStore } from "../../store/useAuthStore";
import GuestMenu from "./GuestMenu";
import UserMenu from "./userMenu";

const AuthSection = () => {
  const status = useAuthStore((s) => s.status);

  if (status === "idle" || status === "loading") return null;
  return status === "authenticated" ? <UserMenu /> : <GuestMenu />;
};

export default AuthSection;
