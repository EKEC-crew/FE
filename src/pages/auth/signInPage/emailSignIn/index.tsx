import AuthHeader from "../../../../components/auth/authHeader";
import AuthContainer from "../../../../components/auth/AuthContainer";

const EmailSignInPage = () => {
  return (
    <>
      <AuthHeader />
      <AuthContainer variant="emailsignIn" />
    </>
  );
};

export default EmailSignInPage;
