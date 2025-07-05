import SignInBackground from "../components/auth/signIn/signInBackground";
import SignInHeader from "../components/auth/signIn/signInHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      <SignInBackground />
      <SignInHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
