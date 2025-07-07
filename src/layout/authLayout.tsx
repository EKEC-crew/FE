import AuthBackground from "../components/auth/authBackground";
import AuthHeader from "../components/auth/authHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      <AuthBackground />
      <AuthHeader />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
