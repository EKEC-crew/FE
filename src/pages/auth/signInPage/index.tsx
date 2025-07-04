import SignInBackground from "../../../components/signIn/signInBackground";
import SignInHeader from "../../../components/signIn/signInHeader";
import SignInContainer from "../../../components/signIn/signInContainer";

const SignInPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      <SignInBackground />
      <SignInHeader />
      <SignInContainer />
    </div>
  );
};

export default SignInPage;
