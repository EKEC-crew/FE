import { useLocation } from "react-router-dom";
import AuthContainer from "../../../components/auth/AuthContainer";

const SignInPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showOAuthError = params.get("oauthError") === "true";

  return (
    <>
      <AuthContainer variant="signIn" showOAuthError={showOAuthError} />
    </>
  );
};

export default SignInPage;
