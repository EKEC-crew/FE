import AuthHeader from "../../../components/auth/authHeader";
import AuthContainer from "../../../components/auth/AuthContainer";

const SignInPage = () => {
  return (
    <>
      <AuthHeader />
      <AuthContainer variant="signIn" />
    </>
  );
};

export default SignInPage;
