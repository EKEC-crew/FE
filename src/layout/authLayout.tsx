import SignInBackground from "../components/signIn/signInBackground";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      <SignInBackground />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
