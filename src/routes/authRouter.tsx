import CreateProfilePage from "../pages/auth/createProfilePage";
import AuthLayout from "../layout/authLayout";
import SignInPage from "../pages/auth/signInPage/";
import EmailSignIn from "../pages/auth/signInPage/emailSignIn";
import SignUpPage from "../pages/auth/signUpPage";
import OAuthSuccess from "../pages/auth/oauthSuccess";
import OAuthFail from "../pages/auth/oauthFail";

const AuthRouter = [
  {
    path: "/signIn",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
      {
        path: "email",
        element: <EmailSignIn />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/createProfile",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <CreateProfilePage />,
      },
    ],
  },
  {
    path: "/oauth/success",
    element: <OAuthSuccess />,
  },
  {
    path: "/oauth/fail",
    element: <OAuthFail />,
  },
];

export default AuthRouter;
