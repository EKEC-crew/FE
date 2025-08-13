import AuthContainer from "../../../components/auth/AuthContainer";

const OAuthFail = () => {
  return (
    <>
      <AuthContainer variant="signIn" showOAuthError={true} />
    </>
  );
};

export default OAuthFail;
